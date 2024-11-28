export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  clinic: string;
  dateOfBirth: string;
}

export interface PatientTableProps {
  patients?: Patient[];
  clinicName?: string;
}

export interface PatientsData {
  patients: Patient[];
  totalPages: number;
}

export interface SortConfig {
  field: string;
  order: 'asc' | 'desc' | null;
}