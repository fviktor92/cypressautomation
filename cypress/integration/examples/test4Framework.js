/// <reference path="../../support/index.d.ts" />
import HomePage from "../pageObjects/HomePage";
describe('My Fourth Test Suite', function () {
    beforeEach(function () {
        cy.fixture("example.json").then((data) => {
            this.data = data;
        });
    });
    it("Data Driven testing with fixtures", function () {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        const homePage = new HomePage();
        homePage.getNameInput().type(this.data.name);
        homePage.getGenderSelect().select(this.data.gender);
        homePage.getTwoWayDataBindingInput().should("have.value", this.data.name);
        homePage.getNameInput().should("have.attr", "minlength", "2");
        homePage.getEntrepreneurRadioBtn().should("be.disabled");
    });
    it("Customized Commands", function () {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        const homePage = new HomePage();
        homePage.getShopTab().click();
        this.data.productNames.forEach((productName) => {
            cy.selectProduct(productName);
        });
    });
});
