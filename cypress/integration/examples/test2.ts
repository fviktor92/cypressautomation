describe('My Second Test Suite', function (): void
{
    it("Handling Alerts", function (): void
    {
        cy.visit(Cypress.env("url") + "/AutomationPractice/");
        cy.get("#alertbtn").click();
        cy.get("[value='Confirm'").click();

        // Firing window:alert event
        cy.on("window:alert", (str: string) =>
        {
            // Mocha
            expect(str).to.equal("Hello , share this practice page and share your knowledge");
        })

        // Firing window:confirm event
        cy.on("window:confirm", (str: string) =>
        {
            // Mocha
            expect(str).to.equal("Hello , Are you sure you want to confirm?");
        })
    });

    it("Handling Child tab", function (): void
    {
        cy.visit(Cypress.env("url") + "/AutomationPractice/");
        cy.get("#opentab").invoke("removeAttr", "target").click();
        cy.url().should("equal", "https://www.rahulshettyacademy.com/#/index");
        cy.go("back");
    });
});