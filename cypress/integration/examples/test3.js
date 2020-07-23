"use strict";
describe("My third test suite", function () {
    it("Handling Web Tables", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("tr td:nth-child(2)").each((element) => {
            let text = element.text();
            if (text.includes("Python")) {
                // Getting the next sibling td element from table
                expect(element.next().text()).to.equal("25");
            }
        });
    });
    it("Handling Mouse hover popups", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get(".mouse-hover-content").invoke("show")
            .contains("Top").click();
        cy.url().should("include", "top");
    });
});
