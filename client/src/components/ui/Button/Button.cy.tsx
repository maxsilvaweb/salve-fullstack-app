import React from 'react';
import { mount } from 'cypress/react';
import Button from './Button';

describe('Button Component', () => {
  it('should render correctly with text', () => {
    mount(<Button>Click Me</Button>);
    cy.get('button').should('contain', 'Click Me');
  });

  it('should handle click events', () => {
    const onClick = cy.stub();
    mount(<Button onClick={onClick}>Click Me</Button>);
    cy.get('button').click();
    cy.wrap(onClick).should('have.been.calledOnce');
  });
});
