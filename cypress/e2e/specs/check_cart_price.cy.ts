import CartPage from "cypress/support/pages/cart_page";

describe("Cart Price Check Test Suite", () => {
  it("user adds first product to cart and checks prices and totals", () => {
    cy.visit('/');
    cy.get('.prdocutname').first().click();
    cy.url().should('include', 'product');
    cy.get('a.cart').click();
    cy.wait(3000);
    const cart = new CartPage();
    cart.visitCart();
    cart.assertProductsExist();
    cart.assertEachProductPrice();
    cart.assertSubtotalPerRow();
    cart.assertTotalCart();
  });
});
