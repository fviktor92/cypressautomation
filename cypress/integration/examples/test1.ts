describe('My First Test Suite', function ()
{
    let url: string = "https://www.seleniumeasy.com/test/";
    it('My First Test Case', function ()
    {
        cy.visit(url);
        cy.get("#at-cv-lightbox-close").click();
        cy.get("#navbar-brand-centered ul:nth-child(1) li.dropdown:nth-child(1)").click()
          .contains("Ajax Form Submit").click()
          .get("#title").type("Viktor Farkas")
          .get("#description").type("This is a Cypress test")
          .get("#btn-submit").click()
          .get("#submit-control").should("contain.text", "Form submited Successfully!");
    });
});