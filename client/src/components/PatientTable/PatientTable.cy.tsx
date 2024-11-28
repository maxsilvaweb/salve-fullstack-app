import { mount } from '@cypress/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_PATIENTS } from '@/graphql/queries';
import PatientTable from './PatientTable';

const mocks = [
  {
    request: {
      query: GET_PATIENTS,
    },
    result: {
      data: {
        patients: [
          {
            id: '1',
            name: 'Max Silva',
            email: 'maxsilvauk@gmail.com',
            clinic: 'London IVF',
          },
        ],
      },
    },
  },
];

describe('PatientTable', () => {
  it('renders patient data correctly', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PatientTable patients={[]} />
      </MockedProvider>
    );

    cy.contains('Max Silva').should('be.visible');
    cy.contains('maxsilvauk@gmail.com').should('be.visible');
    cy.contains('London IVF').should('be.visible');
  });
});
