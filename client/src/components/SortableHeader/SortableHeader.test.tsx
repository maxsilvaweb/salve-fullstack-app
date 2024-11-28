import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SortableHeader from './SortableHeader';

const mockSortConfig = { field: 'name', order: 'asc' };
const mockOnSort = jest.fn();

describe('SortableHeader Component', () => {
  it('renders with label', () => {
    render(
      <SortableHeader
        field="name"
        label="Name"
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
      />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  it('calls onSort when clicked', () => {
    render(
      <SortableHeader
        field="name"
        label="Name"
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
      />
    );
    fireEvent.click(screen.getByText('Name'));
    expect(mockOnSort).toHaveBeenCalledWith('name');
  });

  it('displays the correct sort icon', () => {
    render(
      <SortableHeader
        field="name"
        label="Name"
        sortConfig={mockSortConfig}
        onSort={mockOnSort}
      />
    );
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });
});
