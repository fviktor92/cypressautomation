/// <reference path="../../support/index.d.ts" />

import HomePage from "../../support/pageObjects/HomePage";
import ShopPage from "../../support/pageObjects/ShopPage";

describe('My Fourth Test Suite', function (): void
{
    beforeEach(function (): void
    {
        cy.fixture("example.json").then((data: object): void =>
        {
            this.data = data;
        });
    });

    it("Data Driven testing with fixtures", function (): void
    {
        cy.visit(Cypress.env("url") + "/angularpractice");
        const homePage: HomePage = new HomePage();
        homePage.getNameInput().type(this.data.name);
        homePage.getGenderSelect().select(this.data.gender);
        homePage.getTwoWayDataBindingInput().should("have.value", this.data.name);
        homePage.getNameInput().should("have.attr", "minlength", "2");
        homePage.getEntrepreneurRadioBtn().should("be.disabled");
    });

    it("Customized Commands", function (): void
    {
        cy.visit(Cypress.env("url") + "/angularpractice");
        const homePage: HomePage = new HomePage();
        homePage.getShopTab().click();
        const shopPage: ShopPage = new ShopPage();
        this.data.productNames.forEach((productName: string): void =>
        {
            cy.selectProduct(productName);
        });
        shopPage.getProductsCheckOutBtn().click();

        let sum: number = 0;
        shopPage.getProductPriceTexts().each((element: JQuery<HTMLElement>): void =>
        {
            let actualPrice: number = Number(element.text().split(" ")[1].trim());
            sum += actualPrice;
        });
        shopPage.getTotalPriceText().then((element: JQuery<HTMLElementTagNameMap["strong"]>): void =>
        {
            let actualTotalPrice: number = Number(element.text().split(" ")[1].trim());
            expect(actualTotalPrice).to.equal(sum);
        })

        shopPage.getSummaryCheckOutBtn().click();
        shopPage.getLocationTextInput().type("In");
        shopPage.selectFromLocationDropdown("India");
        shopPage.setTermsAndConditions(true);
        shopPage.getPurchaseBtn().click();
        shopPage.getAlertMessage().should("include.text", "Success! Thank you! Your order will be delivered in next few weeks :-).");
    });
});