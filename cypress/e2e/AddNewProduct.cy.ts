describe('AddMewProductTest', () => {
  it('Add new product', () => {
    cy.visit('localhost:3000');
    cy.get('.Header_icon__MUqiq').click();
    cy.get('#email').type('dev@dev.se');
    cy.get('#password').type('123456');
    cy.get('#loginform').submit().wait(3000);
    cy.get('#addProductButton').click();
    cy.get('#productTitle').type('Hammare');
    cy.get('#productDescription').type('En väldigt fin skruvdragare');
    cy.get('#productPrice').type('20');
    cy.get('#productCategory').select(3);
    cy.get('#productLocation').select(2);
    cy.get('#productImage').selectFile('cypress/fixtures/cat.jpg').wait(5000);
    cy.get('#productForm').submit().wait(1000);
    cy.get('#logOutButton').click();
  });
});

export {};
