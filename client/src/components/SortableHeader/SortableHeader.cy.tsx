import { mount } from 'cypress/react';
import SortableHeader from './SortableHeader';
import { SortConfig } from './SortableHeader.types';

const mockSortConfig: SortConfig = {
  field: 'name',
  order: 'asc',
};

const mockOnSort = cy.stub();

describe('SortableHeader Component', () => {
  it('should render correctly with active sorting icon', () => {
    mount(
      <SortableHeader
        field="name"
        label="Name"
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
      />
    );
    cy.get('button').should('contain', 'Name');
    cy.get('.h-4.w-4').should('exist');
  });

  it('should call onSort with correct field when clicked', () => {
    mount(
      <SortableHeader
        field="name"
        label="Name"
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
      />
    );
    cy.get('button').click();
    cy.wrap(mockOnSort).should('have.been.calledWith', 'name');
  });
});
