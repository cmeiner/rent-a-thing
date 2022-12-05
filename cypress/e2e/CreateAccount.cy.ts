describe('Create account', () => {
  it('Creates an account', () => {
    cy.visit('localhost:3000')
      .get('.Header_icon__MUqiq')
      .click()
      .get('#toRegister')
      .click()
      .wait(500)
      .get('#email')
      .type(`meiner${Math.floor(Math.random() * 10)}@meiner.asd`)
      .get('#password')
      .type('123123')
      .get('#registerForm')
      .submit();
  });
});
