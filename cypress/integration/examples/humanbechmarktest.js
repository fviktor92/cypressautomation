"use strict";
describe("Human Benchmark test", function () {
    it("Reaction Time", function () {
        cy.visit("https://humanbenchmark.com/tests/reactiontime");
        // Start the reaction time test
        cy.contains("Reaction Time Test").click({ force: true });
        // When it turns green the text "Click!" appears
        cy.contains("Click!").click({ force: true });
        // Take the result and print
        logResult("h1:nth-child(1) > div");
    });
    it("Aim Trainer", function () {
        cy.visit("https://humanbenchmark.com/tests/aim");
        // Start the aim trainer by clicking the target
        cy.get("div[data-aim-target='true']").as("target").click({ force: true });
        let hitCounter = 0;
        while (hitCounter < 30) {
            cy.get("@target").click({ force: true });
            hitCounter++;
            cy.log(`Hit: ${hitCounter}`);
        }
        // Take the result and print
        logResult("div[data-test='true']");
    });
    it("Are you smarter than a chimpanzee?", function () {
        cy.visit("https://humanbenchmark.com/tests/chimp");
        // Start the test
        cy.contains("Start Test").click({ force: true });
        // Click all the tiles with numbers in ascending order. These tiles are supposed to be 80px*80px with 5px borders
        clickChimpanzeeTiles();
        // Click the Continue and keep clicking the tiles. Max try is 36
        let scoreCounter = 0;
        while (scoreCounter < 36) {
            cy.log(String(scoreCounter));
            cy.contains("Continue").click({ force: true });
            clickChimpanzeeTiles();
            scoreCounter++;
        }
    });
    function clickChimpanzeeTiles() {
        let numberTiles = [];
        cy.get("div[data-test='true'] div").each((element) => {
            let width = element.css("width");
            let height = element.css("height");
            let border = element.css("border");
            if (width.includes("80px") && height.includes("80px") && border.includes("5px")) {
                numberTiles.push(element);
            }
        }).then(() => {
            numberTiles.sort((a, b) => Number.parseInt(a.text()) - Number.parseInt(b.text()));
            // let tileInnerTexts: string[] = Array.from(numberTiles, numberTile => numberTile.text());
            numberTiles.forEach((numberTile, index, array) => {
                // cy.log("Click " + tileInnerTexts[index]);
                numberTile.trigger("click");
            });
        });
    }
    function logResult(resultSelector) {
        cy.get(resultSelector).then((result) => cy.log(result.text()));
    }
});
