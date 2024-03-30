import { AppSessionObserver } from '@/providers/app-session-observer';
import { AppSessionProvider } from '@/providers/app-session-provider';
import { Comp } from '../comp';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppSessionProvider>
      <AppSessionObserver>
        <div className='p-8 pt-6'>
          <Comp
            clientId={process.env.AAD_APP_CLIENT_ID!}
            initiateLoginEndpoint={process.env.TAB_ENDPOINT!}
          />
          {children}
        </div>
      </AppSessionObserver>
    </AppSessionProvider>
  );
}
