'use client';

import { getCrispAccounts } from '@/app/test.actions';
import UserContext from '@/contexts/user/user-context';
import usePageParams from '@/hooks/use-stateful-search-params';
import { CrispAccount } from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTable } from './data-table';

export function TableSection() {
  const userContext = useContext(UserContext);
  const { pageParams } = usePageParams();
  const [data, setData] = useState<CrispAccount[]>([]);

  useEffect(() => {
    if (!userContext?.isLoggedIn()) return;

    getCrispAccounts(userContext?.token, pageParams.toString())
      .then((res) => {
        console.log(res);
        if (res !== null) {
          setData(res.objects);
        }
      })
      .catch(() =>
        toast.error('Something unexpected occured while retrieving accounts.')
      );
  }, [userContext?.isLoggedIn(), pageParams.get('name__ilike')]);

  return <DataTable data={data} columns={columns} />;
}
