import useEnvVars from '@/hooks/use-env-vars';
import { AppMsalSessionObserver } from '@/providers/app-msal-session-observer';
import { AppMsalSessionProvider } from '@/providers/app-msal-session-provider';
import { Configuration } from '@azure/msal-browser';
import { Header } from './_components/header';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { azureClientId, logoutRedirectUri, loginredirectUri } = useEnvVars();

  const config: Configuration = {
    auth: {
      clientId: azureClientId,
      redirectUri: loginredirectUri,
      postLogoutRedirectUri: logoutRedirectUri,
      navigateToLoginRequestUrl: true,
    },
  };

  return (
    <AppMsalSessionProvider msalConfig={config}>
      <AppMsalSessionObserver>
        <div className='flex-col md:flex'>
          <Header />
          <div>{children}</div>
        </div>
      </AppMsalSessionObserver>
    </AppMsalSessionProvider>
  );
}
