import React from 'react';
import { mount } from 'cypress/react';
import Table from './Table';

const mockData = [
  { id: 1, name: 'John Doe', age: 30 },
  { id: 2, name: 'Jane Smith', age: 25 },
];

const columns = [
  { header: 'Name', accessor: 'name' },
  { header: 'Age', accessor: 'age' },
];

describe('Table Component', () => {
  it('should render table with data', () => {
    mount(<Table data={mockData} columns={columns} />);
    cy.get('table').should('exist');
    cy.get('thead').contains('Name');
    cy.get('thead').contains('Age');
    cy.get('tbody').contains('John Doe');
    cy.get('tbody').contains('Jane Smith');
  });
});
