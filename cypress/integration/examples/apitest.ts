describe("API Testing", function (): void
{
    it("Star Wars API test", function (): void
    {
        cy.request("GET", "https://swapi.dev/api/people/1/")
          .then((response: Cypress.Response): void =>
          {
              expect(response.status).to.equal(200);
              expect(response.body).to.have.property("name", "Luke Skywalker");
          });
    });
})