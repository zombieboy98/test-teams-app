import { unstable_noStore as noStore } from 'next/cache';

function useEnvVars() {
  noStore();

  return {
    environment: process.env.NODE_ENV ?? 'development',
    azureClientId: process.env.AZURE_CLIENT_ID ?? '',
    loginredirectUri: process.env.AUTH_LOGIN_REDIRECT_URI ?? '',
    logoutRedirectUri: process.env.AUTH_LOGOUT_REDIRECT_URI ?? '',
  };
}

export default useEnvVars;
