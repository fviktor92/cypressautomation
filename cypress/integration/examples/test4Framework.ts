/// <reference path="../../support/index.d.ts" />

describe('My Fourth Test Suite', function (): void
{
    before(function ()
    {
        cy.fixture("example.json").then((data: string) =>
        {
            this.data = data;
        })
    });

    it("Data Driven testing with fixtures", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        cy.get("form input[name='name']").as("nameInput").type(this.data.name);
        cy.get("form select").select(this.data.gender);
        cy.get("h4 input").should("have.value", this.data.name);
        cy.get("@nameInput").should("have.attr", "minlength", "2");
        cy.get("#inlineRadio3").should("be.disabled");
    });

    it("Customized Commands", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        cy.get(".navbar-nav .nav-item:nth-child(2) .nav-link").click();
        cy.selectProduct("BlackBerry");
    });
});