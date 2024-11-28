import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import PatientTable from './PatientTable';
import { GET_PATIENTS } from '@/graphql/queries';

const mocks = [
  {
    request: {
      query: GET_PATIENTS,
      variables: { clinicName: 'Test Clinic' },
    },
    result: {
      data: {
        patients: {
          patients: [
            {
              id: 1,
              firstName: 'John',
              lastName: 'Doe',
              dateOfBirth: '1990-01-01',
              clinic: { id: 1, name: 'Test Clinic' },
            },
          ],
          totalPages: 1,
        },
      },
    },
  },
];

describe('PatientTable Component', () => {
  it('renders patient data correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PatientTable clinicName="Test Clinic" />
      </MockedProvider>
    );

    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(await screen.findByText('1/1/1990')).toBeInTheDocument();
    expect(await screen.findByText('Test Clinic')).toBeInTheDocument();
  });
});
