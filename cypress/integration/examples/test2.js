"use strict";
describe('My Second Test Suite', function () {
    it("Handling Alerts", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#alertbtn").click();
        cy.get("[value='Confirm'").click();
        // Firing window:alert event
        cy.on("window:alert", (str) => {
            // Mocha
            expect(str).to.equal("Hello , share this practice page and share your knowledge");
        });
        // Firing window:confirm event
        cy.on("window:confirm", (str) => {
            // Mocha
            expect(str).to.equal("Hello , Are you sure you want to confirm?");
        });
    });
    it("Handling Child tab", function () {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
        cy.get("#opentab").invoke("removeAttr", "target").click();
        cy.url().should("equal", "https://www.rahulshettyacademy.com/#/index");
        cy.go("back");
    });
});
