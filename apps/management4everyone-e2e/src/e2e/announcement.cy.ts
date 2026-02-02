describe('Зарлалын удирдлага - CRUD Тест', () => {
  const uniqueId = Date.now();
  const testTitle = `Тест Зарлал - ${uniqueId}`;
  const updatedTitle = `Шинэчлэгдсэн - ${uniqueId}`;

  beforeEach(() => {
    // 1. Хөтчийн alert/confirm цонхнуудыг "Stub" хийж орлох
    cy.visit('/login', {
      onBeforeLoad(win) {
        // alert гарвал шууд хаана
        cy.stub(win as any, 'alert').as('windowAlert');
        // confirm гарвал шууд "OK" (true) гэж хариулна
        cy.stub(win as any, 'confirm')
          .as('windowConfirm')
          .returns(true);
      },
    });

    // 2. Нэвтрэх хэсэг
    cy.get('input[name="identifier"]').type('hbbaatar@gmail.com');
    cy.contains('Continue').click();
    cy.get('input[name="password"]').type('99150488Ab');
    cy.contains('Continue').click();

    cy.url().should('not.include', '/login');
    cy.visit('/admin/announcement');

    // Хуудас солигдох үед stub-аа дахин идэвхжүүлэх шаардлага гарч магадгүй тул:
    cy.window().then((win) => {
      cy.stub(win as any, 'alert').as('windowAlert');
      cy.stub(win as any, 'confirm')
        .as('windowConfirm')
        .returns(true);
    });
  });

  it('1. Шинэ зарлал амжилттай нэмэх', () => {
    cy.get('input[placeholder="Гарчиг"]').type(testTitle);
    cy.get('textarea[placeholder="Дэлгэрэнгүй мэдээлэл..."]').type('Тест агуулга');
    cy.contains('button', 'Нийтлэх').click();

    // Popup гарсан эсэхийг дотор нь шалгаж болно (цонх харагдахгүй)
    cy.get('@windowAlert').should('be.calledWith', 'Амжилттай хадгалагдлаа!');
    cy.contains(testTitle).should('exist');
  });

  it('2. Зарлалыг амжилттай засах', () => {
    cy.contains(testTitle, { timeout: 10000 }).scrollIntoView().parents('.bg-white').contains('Засах').click();
    cy.get('input[placeholder="Гарчиг"]').clear().type(updatedTitle);
    cy.contains('button', 'Шинэчлэн хадгалах').click();

    cy.get('@windowAlert').should('be.calledWith', 'Амжилттай шинэчлэгдлээ!');
    cy.contains(updatedTitle).should('exist');
  });

  it('3. Зарлалыг амжилттай устгах', () => {
    cy.contains(updatedTitle, { timeout: 10000 }).scrollIntoView().parents('.bg-white').contains('Устгах').click();

    // confirm() дуудагдсан эсэхийг шалгана
    cy.get('@windowConfirm').should('be.called');
    cy.contains(updatedTitle).should('not.exist');
  });
});
