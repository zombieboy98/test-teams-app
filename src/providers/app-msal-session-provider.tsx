'use client';

import { UserInfo } from '@/contexts/user/user-context';
import UserContextProvider from '@/contexts/user/user-provider';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';

type Props = {
  children?: React.ReactNode;
  msalConfig: Configuration;
  user?: UserInfo | null;
};

export const AppMsalSessionProvider = ({ ...props }: Props) => {
  const pca = new PublicClientApplication(props.msalConfig);

  return (
    <MsalProvider instance={pca}>
      <UserContextProvider user={props.user}>
        {props.children}
      </UserContextProvider>
    </MsalProvider>
  );
};
