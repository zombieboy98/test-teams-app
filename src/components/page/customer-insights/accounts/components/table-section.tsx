'use client';

import { getCrispAccounts } from '@/app/test.actions';
import UserContext from '@/contexts/user/user-context';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  CrispAccount,
} from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { DataTable } from '../../../_components/data-table';
import { columns } from './columns';

export function TableSection() {
  const userContext = useContext(UserContext);
  const { pageParams, applyParams } = usePageParams();
  const [response, setResponse] = useState<ApiCollectionResponse<
    CrispAccount[]
  > | null>();

  useEffect(() => {
    if (!userContext?.isLoggedIn()) return;

    getCrispAccounts(userContext?.token, pageParams.toString())
      .then((res) => {
        setResponse(res);
      })
      .catch(() =>
        toast.error('Something unexpected occured while retrieving accounts.')
      );
  }, [userContext?.isLoggedIn(), pageParams.toString()]);

  return (
    <DataTable
      data={response?.objects ?? []}
      columns={columns}
      pagination={{
        totalRecords: response?.meta.count ?? 0,
        pagingState: {
          per_page: 20,
          page: response?.meta.page ?? 0,
        },
        goToPage: (page) => {
          pageParams.set('page', page.toString());
          applyParams();
        },
        setPageSize: (page_size) => {
          // Do nothing
        },
        allowedPageSizes: [20],
      }}
    />
  );
}
