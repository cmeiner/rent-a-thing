describe('Logintest', () => {
  it('Logs in a user', () => {
    cy.visit('localhost:3000');
    cy.get('#headerIcon').click();
    cy.get('#email').type('dev@dev.se');
    cy.get('#password').type('123456');
    cy.get('#loginform').submit().wait(1000);
    cy.get('#logOutButton').click();
  });
});

export { };

