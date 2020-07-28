class HomePage {
    getShopTab() {
        return cy.get(".navbar-nav .nav-item:nth-child(2) .nav-link");
    }
    getNameInput() {
        return cy.get("form input[name='name']");
    }
    getGenderSelect() {
        return cy.get("form select");
    }
    getEntrepreneurRadioBtn() {
        return cy.get("#inlineRadio3");
    }
    getTwoWayDataBindingInput() {
        return cy.get("h4 input");
    }
}
export default HomePage;
