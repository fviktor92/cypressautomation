/// <reference path="../../support/index.d.ts" />

import HomePage from "../pageObjects/HomePage";
import ShopPage from "../pageObjects/ShopPage";

describe('My Fourth Test Suite', function (): void
{
    beforeEach(function ()
    {
        cy.fixture("example.json").then((data: object) =>
        {
            this.data = data;
        });
    });

    it("Data Driven testing with fixtures", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        const homePage: HomePage = new HomePage();
        homePage.getNameInput().type(this.data.name);
        homePage.getGenderSelect().select(this.data.gender);
        homePage.getTwoWayDataBindingInput().should("have.value", this.data.name);
        homePage.getNameInput().should("have.attr", "minlength", "2");
        homePage.getEntrepreneurRadioBtn().should("be.disabled");
    });

    it("Customized Commands", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        const homePage: HomePage = new HomePage();
        homePage.getShopTab().click();
        const shopPage: ShopPage = new ShopPage();
        this.data.productNames.forEach((productName: string) =>
        {
            cy.selectProduct(productName);
        });
        shopPage.getCheckOutBtn().click();
    });
});