'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import UserContext from '@/contexts/user/user-context';
import { CrispContact } from '@/lib/customer-insights/types';
import { cn } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import Link from 'next/link';
import { useContext } from 'react';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<CrispContact>[] = [
  {
    id: 'select',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
  },
  {
    accessorKey: 'id',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => {
      const userContext = useContext(UserContext);
      const contactId = row.original.account_contact_id ?? 'Unknown';

      return (
        <div className='w-fit'>
          <Link
            className='text-wrap font-light hover:underline underline-offset-2 text-xs'
            href={`${
              userContext?.basePath
            }/customer-insights/contacts/${contactId.toString()}`}
          >
            {contactId}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    enableSorting: false,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => {
      const userContext = useContext(UserContext);
      const contactId = row.original.account_contact_id ?? 'Unknown';

      return (
        <div className='flex flex-col gap-2 max-w-[400px]'>
          <div className='flex gap-2'>
            <Link
              className='text-wrap font-medium hover:underline underline-offset-2'
              href={`${
                userContext?.basePath
              }/customer-insights/contacts/${contactId.toString()}`}
            >
              {!row.original.first_name && !row.original.first_name
                ? 'UNKNOWN'
                : `${row.original.first_name} ${row.original.last_name}`}
            </Link>
            {row.original.type && row.original.type !== 'Active' && (
              <Badge
                variant='outline'
                className='text-xs w-fit hover:underline underline-offset-2 truncate flex gap-2'
              >
                {row.original.type}
              </Badge>
            )}
          </div>
          {row.original.email && (
            <div className='text-xs text-muted-foreground text-wrap'>
              {row.original.email}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'position',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Position' />
    ),
    cell: ({ row }) => {
      return (
        <div className='text-xs text-muted-foreground text-wrap'>
          {row.original.position}
        </div>
      );
    },
  },
  {
    accessorKey: 'company',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row }) => {
      const userContext = useContext(UserContext);

      return (
        <div className='text-sm text-muted-foreground text-wrap'>
          <Link
            href={`${userContext?.basePath}/customer-insights/accounts/${row.original?.account_id}`}
            id='company'
            className='tracking-normal hover:text-foreground hover:underline underline-offset-2'
          >
            {row.original.company}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: 'updated',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Updated' />
    ),
    cell: ({ row }) => {
      const now = new Date();
      const lastUpdate = new Date(row.original.change_dt);
      const yearInMs = 1000 * 60 * 60 * 24 * 365;
      const isStale = Number(now) - Number(lastUpdate) >= yearInMs;

      return !row.original.change_dt ? (
        <></>
      ) : (
        <Badge
          variant='outline'
          className={cn('font-light', isStale ? 'text-orange-400' : '')}
        >
          <span className='max-w-[500px] truncate'>
            {formatDistanceToNow(new Date(row.original.change_dt), {
              addSuffix: true,
            })}
          </span>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'active',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Active' />
    ),
    cell: ({ row }) => {
      return row.original.active ? <CheckIcon className='size-4' /> : <></>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
