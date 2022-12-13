describe('AddDescription', () => {
  it('Adds description on profilepage', () => {
    cy.visit('localhost:3000');
    cy.get('.Header_icon__MUqiq').click();
    cy.get('#toRegister').click();
    cy.wait(500);
    cy.get('#displayName').type('Jannie');
    cy.get('#email').type(`test${Math.floor(Math.random() * 2000)}@test.com`);
    cy.get('#password').type('123456');
    cy.get('#profileImage').selectFile('cypress/fixtures/cat.jpg');
    cy.wait(1000);
    cy.get('#registerForm').submit();
    cy.get('#description');
    cy.wait(1000);
    cy.type('A nice description');
    cy.get('#descriptionForm');
    cy.wait(1000);
    cy.submit();
    cy.get('#logOutButton').click();
  });
});

export {};
