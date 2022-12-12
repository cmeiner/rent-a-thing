describe('AddMewProductTest', () => {
  it('Add new product', () => {
    cy.visit('localhost:3000')
      .get('.Header_icon__MUqiq')
      .click()
      .get('#email')
      .type('dev@dev.se')
      .get('#password')
      .type('123456')
      .get('#loginform')
      .submit()
      .wait(1000)
      .get('#addProductButton')
      .click()
      .get('#productTitle')
      .type('Skruvdragare')
      .get('#productDescription')
      .type('En väldigt fin skruvdragare')
      .get('#productPrice')
      .type('20')
      .get('#productCategory')
      .select(3)
      .get('#productImage')
      .selectFile('cypress/fixtures/cat.jpg')
      .wait(2000)
      .get('#productForm')
      .submit()
      .get('#logOutButton')
      .click();
  });
});

export {};
