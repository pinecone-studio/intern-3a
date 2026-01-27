// cypress/support/commands.ts

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Хэрэглэгчийн имейл болон нууц үгээр системд нэвтрэх custom команд.
       * @example cy.login('email@example.com', 'password123')
       */
      login(email: string, password: string): Chainable<void>;
    }
  }
}

// Командын логик
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login');
  cy.get('input[name="identifier"]').type(email);
  cy.contains('Continue').click();
  cy.get('input[name="password"]').type(password);
  cy.contains('Continue').click();
  cy.contains('Системд нэвтрэх').click();
});

export {}; // TypeScript файл гэдгийг баталгаажуулна
