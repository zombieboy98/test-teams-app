import { Separator } from '@/components/ui/separator';
import { GlobalMetric } from '../../_components/global-metric';
import { TableSection } from './components/table-section';

export default function CustomerInsightsAccountsPage() {
  return (
    <div className='h-full px-4 py-6 lg:px-8 relative'>
      <div className='space-y-4'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h2 className='text-2xl font-semibold tracking-tight'>Accounts</h2>
            <p className='text-sm text-muted-foreground'>
              Search for accounts.
            </p>
          </div>
        </div>
        <GlobalMetric hideContacts />
      </div>

      <Separator className='my-4' />
      <div className='relative'>
        <TableSection />
      </div>
    </div>
  );
}
