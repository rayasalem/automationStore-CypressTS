class CartPage {
  elements = {
    cartRows: () => cy.get('.table.table-striped tbody tr'),
    rowPrice: (idx: number) =>
      cy.get(`.table.table-striped tbody tr:nth-child(${idx}) td:nth-child(4)`),
    rowQty: (idx: number) =>
      cy.get(`.table.table-striped tbody tr:nth-child(${idx}) input.qty`),
    rowSubtotal: (idx: number) =>
      cy.get(`.table.table-striped tbody tr:nth-child(${idx}) td:nth-child(6)`),
    totalCart: () => cy.get('.table.table-striped tfoot tr td strong'),
  };

  visitCart() {
    cy.visit('/index.php?rt=checkout/cart');
  }

  assertProductsExist() {
    this.elements.cartRows()
      .should('exist')
      .and('have.length.at.least', 1);
  }

  assertEachProductPrice() {
    this.elements.cartRows().each((_, i) => {
      const idx = i + 1;
      this.elements.rowPrice(idx)
        .invoke('text')
        .should('match', /\$\d+\.\d{2}/);
    });
  }

  assertSubtotalPerRow() {
    this.elements.cartRows().each((_, i) => {
      const idx = i + 1;
      let price = 0,
        qty = 0;

      this.elements.rowPrice(idx).invoke('text')
        .then((t) => price = parseFloat(t.replace('$', '').trim()));

      this.elements.rowQty(idx).invoke('val')
        .then((v) => qty = Number(v as string));

      cy.then(() => {
        const expected = (price * qty).toFixed(2);
        this.elements.rowSubtotal(idx)
          .invoke('text')
          .should('contain', expected);
      });
    });
  }

  assertTotalCart() {
    let sum = 0;
    this.elements.cartRows().each((_, i) => {
      const idx = i + 1;
      this.elements.rowSubtotal(idx).invoke('text')
        .then((t) => sum += parseFloat(t.replace('$', '').trim()));
    })
    .then(() => {
      this.elements.totalCart()
        .invoke('text')
        .then((t) => {
          const total = parseFloat(t.replace('$', '').trim());
          expect(total).to.be.closeTo(sum, 0.01);
        });
    });
  }
}

export default CartPage;
