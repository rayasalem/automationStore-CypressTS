import CartPage from "cypress/support/pages/cart_page";

describe("Cart Price Check Test Suite", () => {
  it("user adds first product to cart and checks prices and totals", () => {
    cy.visit('/');
    const cart = new CartPage();

    cart.add_first_product_to_cart();
    cart.visit_cart();
    cart.assert_products_exist();
    cart.assert_each_product_price();
    cart.assert_subtotal_per_row();
    cart.assert_total_cart();
  });
});
