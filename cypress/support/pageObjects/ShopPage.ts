class ShopPage
{
    getProductsCheckOutBtn(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["button"]>>
    {
        return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link");
    }

    getSummaryCheckOutBtn(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["button"]>>
    {
        return cy.get(":nth-child(6) > :nth-child(5) > .btn");
    }

    getProductPriceTexts(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["strong"]>>
    {
        return cy.get("tr td:nth-child(4) strong");
    }

    getTotalPriceText(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["strong"]>>
    {
        return cy.get("h3 strong");
    }

    getLocationTextInput(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["input"]>>
    {
        return cy.get("#country");
    }

    selectFromLocationDropdown(country: string): Cypress.Chainable<JQuery<HTMLElement>>
    {
        return cy.get(".suggestions").contains(country).click();
    }

    setTermsAndConditions(accept: boolean): Cypress.Chainable<JQuery<HTMLElement>>
    {
        let checkbox = cy.get("#checkbox2");
        if (accept)
        {
            checkbox.check({force: true});
        } else
        {
            checkbox.uncheck({force: true});
        }
        return checkbox;
    }

    getPurchaseBtn(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["input"]>>
    {
        return cy.get("input[type='submit']");
    }

    getAlertMessage(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["div"]>>
    {
        return cy.get(".alert");
    }
}

export default ShopPage;