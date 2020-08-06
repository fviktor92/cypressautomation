"use strict";
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
Cypress.Commands.add("selectProduct", (productName) => {
    cy.get("h4.card-title").each((element, index, list) => {
        if (element.text().includes(productName)) {
            cy.get("button.btn").eq(index).click();
        }
    });
});
Cypress.Commands.add("hitTargets", () => {
    let remainingTargets = 0;
    function hitTargets() {
        // Get the Remaining target number
        cy.get("div[data-test='true'] h2:nth-child(2)").then((remaining) => remainingTargets = Number(remaining.text()));
        // Click until the remaining targets are gone
        return cy.get("@target").click({ force: true })
            .then(() => {
            if (remainingTargets !== 1) {
                hitTargets();
            }
        });
    }
    return hitTargets();
});
Cypress.Commands.add("clickChimpanzeeTiles", () => {
    let numberTiles = [];
    let score = 0;
    let maxScore = 37;
    function clickTiles() {
        score++;
        // Game the divs from the game field
        return cy.get("div[data-test='true'] div").as("tiles").each((div) => {
            // The tiles to click are supposed to be 80px*80px with 5px borders
            let width = div.css("width");
            let height = div.css("height");
            let border = div.css("border");
            if (width.includes("80px") && height.includes("80px") && border.includes("5px")) {
                numberTiles.push(div);
            }
        }).then(() => {
            numberTiles.sort((a, b) => Number.parseInt(a.text()) - Number.parseInt(b.text()));
            numberTiles.forEach((numberTile) => {
                numberTile.trigger("click");
            });
            if (score < maxScore) {
                cy.log(`Score: ${score}`);
                cy.contains("Continue").click({ force: true });
                clickTiles();
            }
        });
    }
    return clickTiles();
});
Cypress.Commands.add("clickVisualWhiteSquares", () => {
    let level = 0;
    let maxLevel = 37;
    function clickSquares() {
        let activeSquareIndices = [];
        level++;
        // Wait for the white squares to appear
        cy.get(".square.active").as("activeSquare");
        return cy.get(".square").as("square").each((square, index) => {
            var _a;
            if ((_a = square.attr("class")) === null || _a === void 0 ? void 0 : _a.includes("active")) {
                activeSquareIndices.push(index);
            }
        }).then(() => {
            // White squares should disappear
            cy.get("@activeSquare").should("not.have.css", "background-color", "rgb(255, 255, 255)");
            cy.get("@square").each((square, index) => {
                if (activeSquareIndices.indexOf(index) > -1) {
                    cy.log(`Click: ${index}`);
                    cy.wrap(square).click({ force: true });
                }
            }).then(() => {
                if (level < maxLevel) {
                    clickSquares();
                }
            });
        });
    }
    return clickSquares();
});
Cypress.Commands.add("logHumanBenchmarkResults", (resultSelector) => {
    cy.get(resultSelector).then((result) => cy.log(result.text()));
});
