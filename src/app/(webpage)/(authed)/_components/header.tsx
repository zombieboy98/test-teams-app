import { MainNav } from '@/app/(webpage)/(authed)/_components/main-nav';
import { UserNav } from '@/app/(webpage)/(authed)/_components/user-nav';
import { ThemeModeToggle } from '@/components/shared/theme-toggle';

export function Header() {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <h2 className='font-black tracking-wide text-2xl'>macquarie</h2>
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
          <ThemeModeToggle />
        </div>
      </div>
    </div>
  );
}
