describe('management4everyone-e2e', () => {
  it('it shows the button', () => {
    cy.visit('/');
    cy.get('[data-cy=button]').should('have.text', 'Системд нэвтрэх');
  });
});
