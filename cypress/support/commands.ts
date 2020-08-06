// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("selectProduct", (productName: string): void =>
{
    cy.get("h4.card-title").each((element: JQuery<HTMLElement>, index: number, list: HTMLElement[]) =>
    {
        if (element.text().includes(productName))
        {
            cy.get("button.btn").eq(index).click();
        }
    });
});

Cypress.Commands.add("clickChimpanzeeTiles", (): void =>
{
    let numberTiles: JQuery<HTMLElement>[] = [];
    cy.get("div[data-test='true'] div").each((div: JQuery<HTMLElement>): void =>
    {
        let width: string = div.css("width");
        let height: string = div.css("height");
        let border: string = div.css("border");

        if (width.includes("80px") && height.includes("80px") && border.includes("5px"))
        {
            numberTiles.push(div);
        }
    }).then((): void =>
    {
        numberTiles.sort((a: JQuery<HTMLElement>, b: JQuery<HTMLElement>): number => Number.parseInt(a.text()) - Number.parseInt(b.text()));
        // let tileInnerTexts: string[] = Array.from(numberTiles, numberTile => numberTile.text());
        numberTiles.forEach((numberTile: JQuery<HTMLElement>, index: number, array: JQuery<HTMLElement>[]): void =>
        {
            // cy.log("Click " + tileInnerTexts[index]);
            numberTile.trigger("click");
        });
    })
});

Cypress.Commands.add("clickVisualWhiteSquares", (): void =>
{
    let activeSquareIndices: number[] = [];

    // Wait for the white squares to appear
    cy.get(".square.active").as("activeSquare");
    cy.get(".square").as("square").each((square: JQuery<HTMLElement>, index: number): void =>
    {
        if (square.attr("class")?.includes("active"))
        {
            activeSquareIndices.push(index);
        }
    }).then((): void =>
    {
        // White squares should disappear
        cy.get("@activeSquare").should("not.have.css", "background-color", "rgb(255, 255, 255)");
        cy.get("@square").each((square: JQuery<HTMLElement>, index: number): void =>
        {
            if (activeSquareIndices.indexOf(index) > -1)
            {
                cy.wrap(square).click({force: true});
            }
        })
    });
});

Cypress.Commands.add("logHumanBenchmarkResults", (resultSelector: string): void =>
{
    cy.get(resultSelector).then((result: JQuery<HTMLElement>): Cypress.Chainable<null> => cy.log(result.text()));
});