'use client';

import { getCrispAccountById, getCrispContacts } from '@/app/test.actions';
import { AccountMetric } from '@/components/page/_components/account-metric';
import { Badge } from '@/components/ui/badge';
import UserContext from '@/contexts/user/user-context';
import usePageParams from '@/hooks/use-stateful-search-params';
import {
  ApiCollectionResponse,
  CrispAccount,
  CrispContact,
} from '@/lib/customer-insights/types';
import {
  GlobeIcon,
  KeyRound,
  NotepadTextIcon,
  PhoneIcon,
  UsersRoundIcon,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { TableSection } from './components/table-section';

type Props = {
  id: string;
};

export default function CustomerInsightsAccountDetailsPage({
  ...props
}: Props) {
  const { pageParams, applyParams } = usePageParams();
  const [account, setAccount] = useState<CrispAccount>();
  const [contacts, setContacts] = useState<ApiCollectionResponse<
    CrispContact[]
  > | null>();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.isLoggedIn()) {
      return;
    }

    getCrispAccountById(userContext?.token, props.id)
      .then((res) => {
        if (res !== null) {
          setAccount(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving account.');
      });

    getCrispContacts(
      userContext?.token,
      `account_id=${props.id}&ordering=-change_dt&${pageParams.toString()}`
    )
      .then((res) => {
        if (res !== null) {
          setContacts(res);
        }
      })
      .catch(() => {
        toast.error('Something unexpected occured while retrieving contacts.');
      });
  }, [userContext?.isLoggedIn()]);

  return (
    <div className='h-full px-4 py-6 lg:px-8 space-y-6'>
      <div>
        <h2 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 flex flex-col gap-1'>
          {account?.name}
          <p className='w-fit tracking-wide text-muted-foreground text-sm font-light'>
            {account?.industry}
          </p>
          <div className='space-x-2'>
            <Badge
              variant={'outline'}
              className='w-fit tracking-wide py-1.5 px-2 hover:underline underline-offset-2 text-xs text-muted-foreground'
            >
              <KeyRound className='size-4 mr-2' />
              {account?.account_id}
            </Badge>
            {account?.home_page && (
              <Badge
                variant={'outline'}
                className='w-fit tracking-wide py-1.5 px-2 hover:underline underline-offset-2 text-xs text-muted-foreground'
              >
                <GlobeIcon className='size-4 mr-2' />
                {account?.home_page}
              </Badge>
            )}
            {account?.phone && (
              <Badge
                variant={'outline'}
                className='w-fit tracking-wide py-1.5 px-2 text-xs text-muted-foreground'
              >
                <PhoneIcon className='size-4 mr-2' />
                {account?.phone} {account?.ext ? `(${account.ext})` : ''}
              </Badge>
            )}
            {account?.num_of_employees && (
              <Badge
                variant={'outline'}
                className='w-fit tracking-wide py-1.5 px-2 text-xs text-muted-foreground'
              >
                <UsersRoundIcon className='size-4 mr-2' />
                {account?.num_of_employees ?? 0}
              </Badge>
            )}
            {account?.notes && (
              <Badge
                variant={'outline'}
                className='w-fit tracking-wide py-1.5 px-2 text-xs text-muted-foreground'
              >
                <NotepadTextIcon className='size-4 mr-2' />
                {account?.notes}
              </Badge>
            )}
          </div>
        </h2>
      </div>
      <div>
        <AccountMetric accountId={props.id} />
      </div>
      <div className='flex flex-col space-y-1'>
        <TableSection accountId={props.id} />
      </div>
    </div>
  );
}
