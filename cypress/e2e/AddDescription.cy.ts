describe('AddDescription', () => {
  it('Adds description on profilepage', () => {
    cy.visit('localhost:3000')
      .get('.Header_icon__MUqiq')
      .click()
      .get('#toRegister')
      .click()
      .wait(500)
      .get('#displayName')
      .type('Jannie')
      .get('#email')
      .type(`test${Math.floor(Math.random() * 2000)}@test.com`)
      .get('#password')
      .type('123456')
      .get('#profileImage')
      .selectFile('cypress/fixtures/cat.jpg')
      .wait(1000)
      .get('#registerForm')
      .submit()
      .get('#description')
      .wait(1000)
      .type('A nice description')
      .get('#descriptionForm')
      .wait(1000)
      .submit()
      .get('#logOutButton')
      .click();
  });
});

export {};
