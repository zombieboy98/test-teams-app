import { AppSessionObserver } from '@/providers/app-session-observer';

export default function TabsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AppSessionObserver>{children}</AppSessionObserver>
    </>
  );
}
