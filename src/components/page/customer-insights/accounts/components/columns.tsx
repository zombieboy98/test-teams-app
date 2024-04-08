'use client';

import { DataTableColumnHeader } from '@/components/page/_components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import UserContext from '@/contexts/user/user-context';
import { CrispAccount } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { useContext } from 'react';
import { DataTableRowActions } from './data-table-row-actions';

export const columns: ColumnDef<CrispAccount>[] = [
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

      return (
        <div className='w-fit'>
          <Link
            className='text-wrap font-light hover:underline underline-offset-2 text-xs'
            href={`${
              userContext?.basePath
            }/customer-insights/accounts/${row.original.account_id.toString()}`}
          >
            {row.original.account_id}
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
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => {
      const userContext = useContext(UserContext);

      return (
        <div className='flex flex-col gap-2 max-w-[400px]'>
          <Link
            className='text-wrap font-medium hover:underline underline-offset-2'
            href={`${
              userContext?.basePath
            }/customer-insights/accounts/${row.original.account_id.toString()}`}
          >
            {row.original.name}
          </Link>
          {row.original.industry && (
            <div className='text-xs text-muted-foreground text-wrap'>
              {row.original.industry}
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'homepage',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Homepage' />
    ),
    cell: ({ row }) => {
      return row.original.home_page ? (
        <span className='max-w-[500px] truncate font-light text-xs'>
          {row.original.home_page}
        </span>
      ) : (
        <></>
      );
    },
  },
  {
    accessorKey: 'notes',
    enableSorting: false,
    enableHiding: true,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Notes' />
    ),
    cell: ({ row }) => {
      return row.original.notes ? (
        <span className='max-w-[500px] truncate font-light text-xs'>
          {row.original.notes}
        </span>
      ) : (
        <></>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
