'use client';

import UserContext, { UserInfo } from '@/contexts/user/user-context';
import { InteractionStatus } from '@azure/msal-browser';
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { ReactNode, useContext, useEffect, useState } from 'react';

/**
 * This hook will listen to session changes
 * and attempt to update the UserContext automatically
 */
/* eslint-disable react-hooks/exhaustive-deps*/
type Props = {
  children?: ReactNode;
  user?: UserInfo | null;
};

export const AppMsalSessionObserver = ({ ...props }: Props) => {
  const [token, setToken] = useState<string>();
  const userContext = useContext(UserContext);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  /**
   * Listen for authenticated user
   */
  useEffect(() => {
    if (
      inProgress !== InteractionStatus.None ||
      userContext?.token === undefined
    ) {
      return;
    }

    // If we have a valid identity, set the UserContext
    if (isAuthenticated || accounts.length > 0) {
      acquireTokenSilent();
      // If we don't have a valid identity, navigate to home
    } else {
      console.log('User is not authenticated');

      // Strict
      instance.loginRedirect({
        scopes: ['User.Read'],
      });
    }
  }, [inProgress, isAuthenticated, accounts, userContext?.token]);

  /**
   * Retrieve user information
   */
  useEffect(() => {
    if (!token) {
      return;
    }

    var headers = new Headers();
    let bearer = 'Bearer ' + token;
    headers.append('Authorization', bearer);

    fetch('https://graph.microsoft.com/v1.0/me', {
      method: 'GET',
      headers: headers,
    }).then(async (resp) => {
      const data = await resp.json();
      userContext?.setUserContext({
        ...userContext,
        name: `${data.givenName} ${data.surname}`.trim(),
      });
    });
  }, [token]);

  /**
   * Acquire access token
   */
  const acquireTokenSilent = async () => {
    await instance
      .acquireTokenSilent({
        scopes: ['User.Read'],
        account: accounts[0],
      })
      .then((tokenResponse) => {
        setToken(tokenResponse.accessToken);
        // Do something with the tokenResponse
        userContext?.setUserContext({
          token: accounts[0].idToken ?? tokenResponse.accessToken,
          id: accounts[0].localAccountId ?? '',
          email: accounts[0].username ?? '',
          name: accounts[0].name ?? accounts[0].username,
          basePath: '',
        });
      })
      .catch(async (err) => {
        return await instance.acquireTokenRedirect({
          scopes: ['User.Read'],
          account: accounts[0],
        });
      });
  };

  return <>{props.children}</>;
};
