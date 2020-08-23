describe("Mocked testing", function (): void
{
    beforeEach(function (): void
    {
        cy.server();
    });

    it('Not found error', function (): void
    {
        const expectedErrorMessage: string = "Comment does not exists!";

        cy.route({
            method: 'PUT',
            url: 'comments/*',
            status: 404,
            response: {
                error: expectedErrorMessage
            },
            delay: 500
        }).as("updateCommentNotFound");

        cy.visit("https://example.cypress.io/commands/network-requests");
        cy.get(".network-put.btn").click();
        cy.get(".network-put-comment").should("have.text", expectedErrorMessage);
    });
});