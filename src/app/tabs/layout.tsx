import { TabSessionProvider } from '@/providers/tab-session-provider';
import { Comp } from '../comp';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TabSessionProvider>
      <div className='p-8 pt-6'>
        <Comp />
        {children}
      </div>
    </TabSessionProvider>
  );
}
