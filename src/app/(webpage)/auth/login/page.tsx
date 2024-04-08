'use client';

import { Button } from '@/components/ui/button';
import UserContext from '@/contexts/user/user-context';
import { useMsal } from '@azure/msal-react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

const basePath = 'http://localhost:3000';

export default function LoginPage() {
  const router = useRouter();
  const { instance, accounts } = useMsal();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext?.isLoggedIn()) {
      router.push(basePath);
    }
  }, [userContext?.isLoggedIn()]);

  return (
    <div className='flex h-dvh'>
      <div className='mx-auto my-auto py-28 text-center px-6 space-y-8'>
        <h2 className='text-5xl font-black'>Macquarie Telecom Group</h2>
        {userContext?.isLoggedIn() ? (
          <Button
            className='text-2xl font-bold rounded-full px-10 py-8'
            onClick={async () =>
              await instance.logout({
                account: accounts[0],
                logoutHint: accounts[0].nativeAccountId,
                postLogoutRedirectUri: `${basePath}/auth/login`,
              })
            }
          >
            Logout
          </Button>
        ) : (
          <Button
            className='text-2xl font-bold rounded-full px-10 py-8'
            onClick={async () =>
              await instance.loginRedirect({
                scopes: ['User.Read'],
                redirectUri: basePath,
              })
            }
          >
            Login with Azure AAD
          </Button>
        )}
      </div>
    </div>
  );
}
