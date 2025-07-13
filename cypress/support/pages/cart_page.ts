class CartPage {

    elements = {
        firstProduct: () => cy.get('.prdocutname').first(),
        addToCartBtn: () => cy.get('a.cart'),
        cartTable: () => cy.get('#totals_table'),
        cartTableRows: () => cy.get('table.table-striped.table-bordered tbody tr')
            .filter((_, el) => Cypress.$(el).find('td').length >= 6),
        totalCartPrice: () => cy.get('#totals_table tbody tr')
            .filter((_, el) => Cypress.$(el).find('td').first().text().includes('Total:'))
            .first().find('td').eq(1)
    }

    add_first_product_to_cart() {
        this.elements.firstProduct().click();
        cy.url().should('include', 'product');
        this.elements.addToCartBtn().should('be.visible').click();
    }

    visit_cart() {
        cy.visit('/index.php?rt=checkout/cart');
        this.elements.cartTable().should('exist');
    }

    row_price(idx: number) {
        return this.elements.cartTableRows().then($rows => cy.wrap($rows[idx - 1]).find('td').eq(3));
    }

    row_qty(idx: number) {
        return this.elements.cartTableRows().eq(idx - 1).find('td').eq(4).find('input');
    }

    row_subtotal(idx: number) {
        return this.elements.cartTableRows().then($rows => cy.wrap($rows[idx - 1]).find('td').eq(5));
    }

    assert_products_exist() {
        this.elements.cartTableRows()
            .should('have.length.at.least', 1)
            .then(rows => cy.log('Cart products count:', rows.length));
    }

    assert_each_product_price() {
        this.elements.cartTableRows().each((_, i) => {
            this.row_price(i + 1)
                .invoke('text')
                .should('match', /\$\d+(\.\d{2})?/);
        });
    }

    assert_subtotal_per_row() {
        this.elements.cartTableRows().each((_, i) => {
            let price = 0, qty = 0;
            this.row_price(i + 1).invoke('text')
                .then(t => price = parseFloat(t.replace('$', '').trim()));
            this.row_qty(i + 1).invoke('val')
                .then(v => qty = Number(v));
            cy.then(() => {
                const expected = (price * qty).toFixed(2);
                this.row_subtotal(i + 1)
                    .invoke('text')
                    .should('contain', expected);
            });
        });
    }

    assert_total_cart() {
        let sum = 0;
        this.elements.cartTableRows().each((_, i) => {
            this.row_subtotal(i + 1).invoke('text')
                .then(t => sum += parseFloat(t.replace('$', '').trim()));
        }).then(() => {
            this.elements.totalCartPrice()
                .invoke('text')
                .then(t => {
                    const total = parseFloat(t.replace('$', '').trim());
                    expect(total).to.be.closeTo(sum, 0.01);
                });
        });
    }

}

export default CartPage;
