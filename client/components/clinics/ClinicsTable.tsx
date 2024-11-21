import { useState } from 'react';
import { useGetClinicsQuery } from '@/generated/graphql';
import { Button } from '@/components/ui/Button';

export function ClinicsTable() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, loading } = useGetClinicsQuery({
    variables: {
      offset: page * pageSize,
      limit: pageSize,
    },
  });

  if (loading) return <div>Loading...</div>;

  const totalPages = Math.ceil((data?.clinicsCount || 0) / pageSize);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded p-2"
        >
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td className="px-6 py-4 whitespace-nowrap">{clinic.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{clinic.address}</td>
                <td className="px-6 py-4 whitespace-nowrap">{clinic.service_type}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button>Book Appointment</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
          Previous
        </Button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <Button
          onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
