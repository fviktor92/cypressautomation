class HomePage
{
    getShopTab(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["li"]>>
    {
        return cy.get(".navbar-nav .nav-item:nth-child(2) .nav-link");
    }

    getNameInput(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["input"]>>
    {
        return cy.get("form input[name='name']");
    }

    getGenderSelect(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["select"]>>
    {
        return cy.get("form select");
    }

    getEntrepreneurRadioBtn(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["input"]>>
    {
        return cy.get("#inlineRadio3");
    }

    getTwoWayDataBindingInput(): Cypress.Chainable<JQuery<HTMLElementTagNameMap["input"]>>
    {
        return cy.get("h4 input");
    }
}

export default HomePage;