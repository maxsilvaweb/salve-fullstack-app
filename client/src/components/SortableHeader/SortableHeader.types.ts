export type SortField = 'name' | 'dateOfBirth' | 'clinic';
export type SortOrder = 'asc' | 'desc' | null;

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface SortableHeaderProps {
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}
