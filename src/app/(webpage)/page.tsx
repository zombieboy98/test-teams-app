import DashboardPage from '@/components/page/dashboard';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Example dashboard app built using the components.',
};

export default function DashboardWebpage() {
  return (
    <div className='p-8 pt-6 space-y-4'>
      <DashboardPage />
    </div>
  );
}
