class CartPage {
  getRowsWithTd() {
    return cy.get('table.table-striped.table-bordered tbody tr').filter((_, el) => {
      const tdCount = Cypress.$(el).find('td').length;
      return tdCount >= 6;
    });
  }

  rowPrice(idx: number) {
    return this.getRowsWithTd().then($rows => {
      const row = $rows[idx - 1];
      if (!row) throw new Error(`Row ${idx} not found`);
      return cy.wrap(row).find('td').eq(3);
    });
  }

  rowQty(idx: number) {
    return this.getRowsWithTd().eq(idx - 1).find('td').eq(4).find('input');
  }

  rowSubtotal(idx: number) {
    return this.getRowsWithTd().then($rows => {
      const row = $rows[idx - 1];
      if (!row) throw new Error(`Row ${idx} not found`);
      return cy.wrap(row).find('td').eq(5);
    });
  }

  cartRows() {
    return this.getRowsWithTd();
  }

  totalCart() {
    return cy.get('#totals_table tbody tr')
      .filter((_, el) => Cypress.$(el).find('td').first().text().includes('Total:'))
      .first()
      .find('td').eq(1);
  }

  visitCart() {
    cy.visit('/index.php?rt=checkout/cart');
    cy.get('#totals_table').should('exist'); // تأكد وجود جدول الإجمالي
  }

  assertProductsExist() {
    this.cartRows()
      .should('have.length.at.least', 1)
      .then(rows => {
        cy.log('عدد منتجات العربة:', rows.length);
      });
  }

  assertEachProductPrice() {
    this.cartRows().each((_, i) => {
      const idx = i + 1;
      this.rowPrice(idx)
        .invoke('text')
        .should('match', /\$\d+(\.\d{2})?/);
    });
  }

  assertSubtotalPerRow() {
    this.cartRows().each((_, i) => {
      const idx = i + 1;
      let price = 0, qty = 0;

      this.rowPrice(idx).invoke('text')
        .then(t => price = parseFloat(t.replace('$', '').trim()));

      this.rowQty(idx).invoke('val')
        .then(v => qty = Number(v));

      cy.then(() => {
        const expected = (price * qty).toFixed(2);
        this.rowSubtotal(idx)
          .invoke('text')
          .should('contain', expected);
      });
    });
  }

  assertTotalCart() {
    let sum = 0;
    this.cartRows().each((_, i) => {
      const idx = i + 1;
      this.rowSubtotal(idx).invoke('text')
        .then(t => sum += parseFloat(t.replace('$', '').trim()));
    }).then(() => {
      this.totalCart()
        .invoke('text')
        .then(t => {
          const total = parseFloat(t.replace('$', '').trim());
          expect(total).to.be.closeTo(sum, 0.01);
        });
    });
  }
}

export default CartPage;
