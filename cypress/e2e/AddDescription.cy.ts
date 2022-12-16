
describe('AddDescription', () => {
  it('Adds description on profilepage', () => {
    cy.visit('localhost:3000');
    cy.get('#headerIcon').click();
    cy.get('#toRegister').click().wait(500);
    cy.get('#displayName').type('Jannie');
    cy.get('#email').type(`test${Math.floor(Math.random() * 2000)}@test.com`);
    cy.get('#password').type('123456');
    cy.get('#profileImage').selectFile('cypress/fixtures/cat.jpg').wait(2000);
    cy.get('#registerForm').submit().wait(5000);
    cy.get('#description').click();
    cy.get('#slider').contains('Biografi').click();
    cy.get('#descriptionField').type('En fin beskrivning');
    cy.get('#updateDescription').click();
    cy.get('#descriptionForm').submit();
    cy.get('#logOutButton').click();
  });
});

export { };

