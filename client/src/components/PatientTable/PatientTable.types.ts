export interface Patient {
  id: string;
  name: string;
  email: string;
  clinic: string;
}

export interface PatientTableProps {
  patients: Patient[];
}

export interface PatientsData {
  patients: Patient[];
  totalPages: number;
}

export interface SortConfig {
  field: string;
  order: 'asc' | 'desc' | null;
}