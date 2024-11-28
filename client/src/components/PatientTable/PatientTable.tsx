import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PATIENTS } from '@/graphql/queries';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  clinicId: number;
  clinic?: {
    id: number;
    name: string;
  };
}

interface PatientsData {
  patients: {
    patients: Patient[];
    totalPages: number;
  };
}

interface PatientTableProps {
  clinicName?: string;
}

type SortField = 'name' | 'dateOfBirth' | 'clinic';
type SortOrder = 'asc' | 'desc' | null;

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

interface SortableHeaderProps {
  field: SortField;
  label: string;
  sortConfig: SortConfig;
  onSort: (field: SortField) => void;
}

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

const PatientTable: React.FC<PatientTableProps> = ({ clinicName }) => {
  const { loading, error, data } = useQuery<PatientsData>(GET_PATIENTS, {
    variables: { clinicName },
  });

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'name',
    order: null,
  });

  const handleSort = (field: SortField) => {
    setSortConfig((prev) => ({
      field,
      order:
        prev.field === field
          ? prev.order === null
            ? 'asc'
            : prev.order === 'asc'
            ? 'desc'
            : null
          : 'asc',
    }));
  };

  const sortData = (patients: Patient[]) => {
    if (!sortConfig.order) return patients;

    return [...patients].sort((a, b) => {
      const multiplier = sortConfig.order === 'asc' ? 1 : -1;

      switch (sortConfig.field) {
        case 'name':
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          return nameA.localeCompare(nameB) * multiplier;

        case 'dateOfBirth':
          return (
            (new Date(a.dateOfBirth).getTime() -
              new Date(b.dateOfBirth).getTime()) *
            multiplier
          );

        case 'clinic':
          const clinicA = a.clinic?.name?.toLowerCase() ?? '';
          const clinicB = b.clinic?.name?.toLowerCase() ?? '';
          return clinicA.localeCompare(clinicB) * multiplier;

        default:
          return 0;
      }
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;

  const sortedPatients = sortData(data?.patients.patients ?? []);

  return (
    <div className="rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader
              field="name"
              label="Name"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHeader
              field="dateOfBirth"
              label="Date of Birth"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
            <SortableHeader
              field="clinic"
              label="Clinic"
              sortConfig={sortConfig}
              onSort={handleSort}
            />
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedPatients.map((patient: Patient) => (
            <TableRow key={patient.id}>
              <TableCell>{`${patient.firstName} ${patient.lastName}`}</TableCell>
              <TableCell>
                {new Date(patient.dateOfBirth).toLocaleDateString()}
              </TableCell>
              <TableCell>{patient.clinic?.name || 'N/A'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PatientTable;
