class ShopPage {
    getProductsCheckOutBtn() {
        return cy.get("#navbarResponsive > .navbar-nav > .nav-item > .nav-link");
    }
    getSummaryCheckOutBtn() {
        return cy.get(":nth-child(6) > :nth-child(5) > .btn");
    }
    getProductPriceTexts() {
        return cy.get("tr td:nth-child(4) strong");
    }
    getTotalPriceText() {
        return cy.get("h3 strong");
    }
    getLocationTextInput() {
        return cy.get("#country");
    }
    selectFromLocationDropdown(country) {
        return cy.get(".suggestions").contains(country).click();
    }
    setTermsAndConditions(accept) {
        let checkbox = cy.get("#checkbox2");
        if (accept) {
            checkbox.check({ force: true });
        }
        else {
            checkbox.uncheck({ force: true });
        }
        return checkbox;
    }
    getPurchaseBtn() {
        return cy.get("input[type='submit']");
    }
    getAlertMessage() {
        return cy.get(".alert");
    }
}
export default ShopPage;
