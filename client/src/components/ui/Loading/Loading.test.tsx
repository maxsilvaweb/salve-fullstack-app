import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from './Loading';

describe('Loading Component', () => {
  it('renders loading spinner and text', () => {
    render(<Loading />);
    expect(screen.getByText('Loading Patients...')).toBeInTheDocument();
  });
});
