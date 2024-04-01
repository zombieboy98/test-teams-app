import { MainNav } from '@/app/(webpage)/_components/main-nav';
import TeamSwitcher from '@/app/(webpage)/_components/team-switcher';
import { UserNav } from '@/app/(webpage)/_components/user-nav';
import { ThemeModeToggle } from '@/components/shared/theme-toggle';

export function Header() {
  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <TeamSwitcher />
        <MainNav className='mx-6' />
        <div className='ml-auto flex items-center space-x-4'>
          <UserNav />
          <ThemeModeToggle />
        </div>
      </div>
    </div>
  );
}
