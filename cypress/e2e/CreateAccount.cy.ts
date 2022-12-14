// describe('Create account', () => {
//   it('Creates an account', () => {
//     cy.visit('localhost:3000');
//     cy.get('.Header_icon__MUqiq').click();
//     cy.get('#toRegister').click().wait(500);
//     cy.get('#displayName').type('meiner');
//     cy.get('#email').type(`test${Math.floor(Math.random() * 2000)}@test.com`);
//     cy.get('#password').type('123123');
//     cy.get('#profileImage').selectFile('cypress/fixtures/cat.jpg').wait(1000);
//     cy.get('#registerForm').submit();
//     cy.get('#logOutButton').click();
//   });
// });

export {};
