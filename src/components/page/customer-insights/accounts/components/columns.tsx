'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { CrispAccount } from '@/lib/customer-insights/types';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
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
    cell: ({ row }) => <div className='w-fit'>{row.original.account_id}</div>,
  },
  {
    accessorKey: 'name',
    enableSorting: true,
    enableHiding: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Account' />
    ),
    cell: ({ row }) => {
      return (
        <div className='flex flex-col gap-2 max-w-[400px]'>
          <span className='text-wrap font-medium'>{row.original.name}</span>
          {row.original.industry && (
            <div className='text-xs text-muted-foreground text-wrap'>
              {row.original.industry}
            </div>
          )}
          {row.original.home_page && (
            <span className='text-xs hover:underline underline-offset-2 truncate flex gap-2'>
              {row.original.home_page}
            </span>
          )}
        </div>
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
      return (
        <span className='max-w-[500px] truncate'>{row.original.notes}</span>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
