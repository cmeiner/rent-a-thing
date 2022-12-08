describe('Logintest', () => {
  it('Logs in a user', () => {
    cy.visit('localhost:3000')
      .get('.Header_icon__MUqiq')
      .click()
      .get('#email')
      .type('dev@dev.se')
      .get('#password')
      .type('123456')
      .get('#loginform')
      .submit();
  });
});

export {};
