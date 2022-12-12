describe('Create account', () => {
  it('Creates an account', () => {
    cy.visit('localhost:3000')
      .get('.Header_icon__MUqiq')
      .click()
      .get('#toRegister')
      .click()
      .wait(500)
      .get('#displayName')
      .type('meiner')
      .get('#email')
      .type(`test${Math.floor(Math.random() * 2000)}@test.com`)
      .get('#password')
      .type('123123')
      .get('#profileImage')
      .selectFile('cypress/fixtures/cat.jpg')
      .wait(1000)
      .get('#registerForm')
      .submit()
      .get('#logOutButton')
      .click();
  });
});

export {};
