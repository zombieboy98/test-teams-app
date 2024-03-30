import { MainNav } from '@/components/shared/main-nav';
import TeamSwitcher from '@/components/shared/team-switcher';
import { ThemeModeToggle } from '@/components/shared/theme-toggle';
import { UserNav } from '@/components/shared/user-nav';

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
