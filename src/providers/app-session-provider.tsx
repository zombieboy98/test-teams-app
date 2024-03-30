'use client';

import { UserInfo } from '@/contexts/user/user-context';
import UserContextProvider from '@/contexts/user/user-provider';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
  user?: UserInfo | null;
};

export const AppSessionProvider = ({ ...props }: Props) => {
  return (
    <UserContextProvider user={props.user}>
      {props.children}
    </UserContextProvider>
  );
};
