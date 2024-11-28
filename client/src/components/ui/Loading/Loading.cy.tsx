import React from 'react';
import { mount } from 'cypress/react';
import Loading from './Loading';

describe('Loading Component', () => {
  it('should render loading spinner and text', () => {
    mount(<Loading />);
    cy.get('.spinner').should('exist');
    cy.contains('Loading...').should('exist');
  });
});
