// describe('AddDescription', () => {
//   it('Adds description on profilepage', () => {
//     cy.visit('localhost:3000')
//       .get('.Header_icon__MUqiq')
//       .click()
//       .get('#toRegister')
//       .click()
//       .wait(500)
//       .get('#displayName')
//       .type('meiner')
//       .get('#email')
//       .type(`test${Math.floor(Math.random() * 100)}@test.com`)
//       .get('#password')
//       .type('123456')
//       .get('#registerForm')
//       .submit()
//       .get('#description')
//       .wait(500)
//       .type('A nice description')
//       .get('#descriptionForm')
//       .submit();
//   });
// });

export {};
