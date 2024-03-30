import DashboardPage from '@/components/page/dashboard';
import { Metadata } from 'next';
import { Comp } from '../comp';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

export default function DashboardWebpage() {
  return (
    <div className='p-8 pt-6'>
      <Comp
        clientId={process.env.AAD_APP_CLIENT_ID!}
        initiateLoginEndpoint={process.env.TAB_ENDPOINT!}
      />
      <DashboardPage />
    </div>
  );
}
