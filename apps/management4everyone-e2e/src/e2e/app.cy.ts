describe('management4everyone-e2e', () => {
  it('Нэвтрэх үйлдлийг амжилттай хийж байна', () => {
    // Нэвтрэх функцийг дуудах
    cy.login('hbbaatar@gmail.com', '');

    // Нэвтэрсний дараах шалгалтуудаа энд бичнэ
    cy.url().should('not.include', '/login');
  });

  it('Нүүр хуудасны товчийг шалгах', () => {
    cy.visit('/');
    cy.get('[data-cy=button]').should('have.text', 'Системд нэвтрэх');
  });
});
