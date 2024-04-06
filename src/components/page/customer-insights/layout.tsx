import { Metadata } from 'next';

import { Sidebar } from './components/sidebar';

export const metadata: Metadata = {
  title: 'Customer Insights',
  description: 'Customer insights for Macquarie Telecom Group.',
};

export default function CustomerInsightsLayout({
  basePath,
  children,
}: Readonly<{
  basePath: string;
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='md:block'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-6'>
            <Sidebar className='hidden lg:block' basePath={basePath} />
            <div className='col-span-4 lg:col-span-5 lg:border-l'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
