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

Cypress.Commands.add("hitTargets", (): Cypress.Chainable<JQuery<HTMLElement>> =>
{
    let remainingTargets: number = 0;

    function hitTargets(): Cypress.Chainable<JQuery<HTMLElement>>
    {
        // Get the Remaining target number
        cy.get("div[data-test='true'] h2:nth-child(2)").then((remaining: JQuery<HTMLElement>): number => remainingTargets = Number(remaining.text()));
        // Click until the remaining targets are gone
        return cy.get("@target").click({force: true})
                 .then((): void =>
                 {
                     if (remainingTargets !== 1)
                     {
                         hitTargets();
                     }
                 });
    }

    return hitTargets();
})

Cypress.Commands.add("clickChimpanzeeTiles", (): Cypress.Chainable<JQuery<HTMLElement>> =>
{
    let numberTiles: JQuery<HTMLElement>[] = [];
    let score: number = 0;
    let maxScore: number = 37;

    function clickTiles(): Cypress.Chainable<JQuery<HTMLElement>>
    {
        score++;
        // Game the divs from the game field
        return cy.get("div[data-test='true'] div").as("tiles").each((div: JQuery<HTMLElement>): void =>
        {
            // The tiles to click are supposed to be 80px*80px with 5px borders
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
            numberTiles.forEach((numberTile: JQuery<HTMLElement>): void =>
            {
                numberTile.trigger("click");
            });
            if (score < maxScore)
            {
                cy.log(`Score: ${score}`);
                cy.contains("Continue").click({force: true});
                clickTiles();
            }
        })
    }

    return clickTiles();
});

Cypress.Commands.add("clickVisualWhiteSquares", (): Cypress.Chainable<JQuery<HTMLElement>> =>
{
    let level: number = 0;
    let maxLevel: number = 37;

    function clickSquares(): Cypress.Chainable<JQuery<HTMLElement>>
    {
        let activeSquareIndices: number[] = [];
        level++;
        // Wait for the white squares to appear
        cy.get(".square.active").as("activeSquare");
        return cy.get(".square").as("square").each((square: JQuery<HTMLElement>, index: number): void =>
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
                    cy.log(`Click: ${index}`);
                    cy.wrap(square).click({force: true});
                }
            }).then((): void =>
            {
                if (level < maxLevel)
                {
                    clickSquares();
                }
            });
        });
    }

    return clickSquares();
});

Cypress.Commands.add("logHumanBenchmarkResults", (resultSelector: string): void =>
{
    cy.get(resultSelector).then((result: JQuery<HTMLElement>): Cypress.Chainable<null> => cy.log(result.text()));
});