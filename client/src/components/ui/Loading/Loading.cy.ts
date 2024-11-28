describe('Loading Component', () => {
  it('should display loading text and spinner', () => {
    cy.mount(<Loading />);
    cy.get('.animate-spin').should('exist');
    cy.contains('Loading Patients...').should('exist');
  });
});
