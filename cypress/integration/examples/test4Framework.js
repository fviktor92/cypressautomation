/// <reference path="../../support/index.d.ts" />
import HomePage from "../../support/pageObjects/HomePage";
import ShopPage from "../../support/pageObjects/ShopPage";
describe('My Fourth Test Suite', function () {
    beforeEach(function () {
        cy.fixture("example.json").then((data) => {
            this.data = data;
        });
    });
    it("Data Driven testing with fixtures", function () {
        cy.visit(Cypress.env("url") + "/angularpractice");
        const homePage = new HomePage();
        homePage.getNameInput().type(this.data.name);
        homePage.getGenderSelect().select(this.data.gender);
        homePage.getTwoWayDataBindingInput().should("have.value", this.data.name);
        homePage.getNameInput().should("have.attr", "minlength", "2");
        homePage.getEntrepreneurRadioBtn().should("be.disabled");
    });
    it("Customized Commands", function () {
        cy.visit(Cypress.env("url") + "/angularpractice");
        const homePage = new HomePage();
        homePage.getShopTab().click();
        const shopPage = new ShopPage();
        this.data.productNames.forEach((productName) => {
            cy.selectProduct(productName);
        });
        shopPage.getProductsCheckOutBtn().click();
        let sum = 0;
        shopPage.getProductPriceTexts().each(element => {
            let actualPrice = Number(element.text().split(" ")[1].trim());
            sum += actualPrice;
        });
        shopPage.getTotalPriceText().then(element => {
            let actualTotalPrice = Number(element.text().split(" ")[1].trim());
            expect(actualTotalPrice).to.equal(sum);
        });
        shopPage.getSummaryCheckOutBtn().click();
        shopPage.getLocationTextInput().type("In");
        shopPage.selectFromLocationDropdown("India");
        shopPage.setTermsAndConditions(true);
        shopPage.getPurchaseBtn().click();
        shopPage.getAlertMessage().should("include.text", "Success! Thank you! Your order will be delivered in next few weeks :-).");
    });
});
