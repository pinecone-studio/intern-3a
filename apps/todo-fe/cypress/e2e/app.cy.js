describe('App', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the welcome page', () => {
    cy.contains('Welcome to Your App').should('be.visible');
    cy.contains('Get Started').should('be.visible');
  });

  it('should have a working button', () => {
    cy.get('button').contains('Get Started').should('exist');
  });
});
