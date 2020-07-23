describe('My First Test Suite', function (): void
{
    it("Product filtering", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.get(".search-keyword").type("ca")
            // Finds the descendent DOM elements with the given selector and clicking the third
          .get(".products").as("productsLocator").find(".product").should("have.length", 4)
          .eq(2).contains("ADD TO CART").click();
        // Iterating through found elements and clicking that contains expected text
        cy.get("@productsLocator").find(".product").each((element: JQuery<HTMLElement>): void =>
        {
            let textVeg: string = element.find("h4.product-name").text();
            if (textVeg.includes("Cashews"))
            {
                element.find("button").trigger("click");
            }
        })
        // Resolving the promise ourselves and getting the text of element
        let logo: Cypress.Chainable<JQuery<HTMLElementTagNameMap["div"]>> = cy.get(".brand");
        logo.should("have.text", "GREENKART");
        logo.then(function (logoElement: JQuery<HTMLElementTagNameMap["div"]>): void
        {
            cy.log(logoElement.text());
        })
    });

    it("Handling Web Controls UI", function (): void
    {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        // Checkbox
        cy.get("#checkBoxOption1").check().should("be.checked").and("have.value", "option1");
        cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
        cy.get("input[type='checkbox']").check(["option2", "option3"]);

        // Static dropdown
        cy.get("select").select("option2").should("have.value", "option2");

        // Dynamic dropdown
        cy.get("#autocomplete").type("ind");
        cy.get(".ui-menu-item").each(element =>
        {
            if (element.text() === "India")
            {
                element.trigger("click");
            }
        });
        cy.get("#autocomplete").should("have.value", "India");

        // Handling visible and invisible elements using Assertions
        cy.get("#displayed-text").should("be.visible");
        cy.get("#hide-textbox").click();
        cy.get("#displayed-text").should("not.be.visible");
        cy.get("#show-textbox").click();
        cy.get("#displayed-text").should("be.visible");

        // Radio buttons
        cy.get("[value='radio2']").check().should("be.checked");
    });
});