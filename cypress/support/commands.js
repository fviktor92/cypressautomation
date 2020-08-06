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
Cypress.Commands.add("clickChimpanzeeTiles", () => {
    let numberTiles = [];
    cy.get("div[data-test='true'] div").each((div) => {
        let width = div.css("width");
        let height = div.css("height");
        let border = div.css("border");
        if (width.includes("80px") && height.includes("80px") && border.includes("5px")) {
            numberTiles.push(div);
        }
    }).then(() => {
        numberTiles.sort((a, b) => Number.parseInt(a.text()) - Number.parseInt(b.text()));
        // let tileInnerTexts: string[] = Array.from(numberTiles, numberTile => numberTile.text());
        numberTiles.forEach((numberTile, index, array) => {
            // cy.log("Click " + tileInnerTexts[index]);
            numberTile.trigger("click");
        });
    });
});
Cypress.Commands.add("clickVisualWhiteSquares", () => {
    let activeSquareIndices = [];
    // Wait for the white squares to appear
    cy.get(".square.active").as("activeSquare");
    cy.get(".square").as("square").each((square, index) => {
        var _a;
        if ((_a = square.attr("class")) === null || _a === void 0 ? void 0 : _a.includes("active")) {
            activeSquareIndices.push(index);
        }
    }).then(() => {
        // White squares should disappear
        cy.get("@activeSquare").should("not.have.css", "background-color", "rgb(255, 255, 255)");
        cy.get("@square").each((square, index) => {
            if (activeSquareIndices.indexOf(index) > -1) {
                cy.wrap(square).click({ force: true });
            }
        });
    });
});
Cypress.Commands.add("logHumanBenchmarkResults", (resultSelector) => {
    cy.get(resultSelector).then((result) => cy.log(result.text()));
});
