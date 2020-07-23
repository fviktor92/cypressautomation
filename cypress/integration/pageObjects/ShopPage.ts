class ShopPage
{
    getCheckOutBtn(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["button"]>>
    {
        return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link");
    }
}

export default ShopPage;