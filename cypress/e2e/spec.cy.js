describe('Test', () => {
  it('Cypress test', () => {
    cy.visit('http://localhost:19006/');
    cy.contains('App').should(`have.text`, 'App');
  });
});
