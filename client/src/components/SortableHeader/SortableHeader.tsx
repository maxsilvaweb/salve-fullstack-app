import React from 'react';
import { TableHead } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';
import { SortableHeaderProps } from './SortableHeader.types';

const SortableHeader: React.FC<SortableHeaderProps> = ({
  field,
  label,
  sortConfig,
  onSort,
}) => {
  const isActive = sortConfig.field === field;
  const icon = isActive ? (
    sortConfig.order === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 text-white" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 text-white" />
    )
  ) : (
    <ArrowUpDown className="ml-2 h-4 w-4 text-white" />
  );

  return (
    <TableHead>
      <Button
        variant="ghost"
        onClick={() => onSort(field)}
        className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-900 hover:focus:outline-none hover:text-white margin-left-[-12px]"
      >
        {label}
        {icon}
      </Button>
    </TableHead>
  );
};

export default SortableHeader;
