'use client';

import { getCrispContacts } from '@/app/test.actions';
import { DataTable } from '@/components/page/_components/data-table';
import UserContext from '@/contexts/user/user-context';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  CrispContact,
} from '@/lib/customer-insights/types';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { columns } from './columns';
import { DataTableToolbar } from './data-table-toolbar';

type Props = {
  accountId: string;
};

export function TableSection({ ...props }: Props) {
  const { pageParams, applyParams } = usePageParams();
  const [response, setResponse] = useState<
    ApiCollectionResponse<CrispContact[]> | null | undefined
  >();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn() || !props.accountId) {
      return;
    }

    getCrispContacts(
      userContext?.token,
      `account_id=${
        props.accountId
      }&ordering=-change_dt&${pageParams.toString()}`
    )
      .then((res) => {
        if (res !== null) {
          setResponse(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving contacts.');
      });
  }, [userContext?.isLoggedIn(), props.accountId]);

  return (
    <DataTable
      data={response?.objects ?? []}
      columns={columns}
      Toolbar={DataTableToolbar}
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
