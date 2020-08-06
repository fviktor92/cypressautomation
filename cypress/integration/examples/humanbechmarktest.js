"use strict";
/// <reference path="../../support/index.d.ts" />
describe("Human Benchmark test", function () {
    it("Reaction Time", function () {
        cy.visit("https://humanbenchmark.com/tests/reactiontime");
        // Start the reaction time test
        cy.contains("Reaction Time Test").click({ force: true });
        // When it turns green the text "Click!" appears
        cy.contains("Click!").click({ force: true });
        // Take the result and print
        cy.logHumanBenchmarkResults("h1:nth-child(1) > div");
    });
    it("Aim Trainer", function () {
        cy.visit("https://humanbenchmark.com/tests/aim");
        // Start the aim trainer by clicking the target
        cy.get("div[data-aim-target='true']").as("target").click({ force: true }).then(() => {
            let hitCounter = 0;
            while (hitCounter < 30) {
                cy.get("@target").click({ force: true });
                hitCounter++;
                cy.log(`Hit: ${hitCounter}`);
            }
            // Take the result and print
            cy.logHumanBenchmarkResults("div[data-test='true']");
        });
    });
    it("Are you smarter than a chimpanzee?", function () {
        cy.visit("https://humanbenchmark.com/tests/chimp");
        // Start the test
        cy.contains("Start Test").click({ force: true }).then(() => {
            // Click all the tiles with numbers in ascending order. These tiles are supposed to be 80px*80px with 5px borders
            cy.clickChimpanzeeTiles();
            // Click the Continue and keep clicking the tiles. Max try is 36
            let scoreCounter = 0;
            while (scoreCounter < 36) {
                cy.log(String(scoreCounter));
                cy.contains("Continue").click({ force: true });
                cy.clickChimpanzeeTiles();
                scoreCounter++;
            }
        });
    });
    it.only("Visual Memory Test", function () {
        cy.visit("https://humanbenchmark.com/tests/memory");
        // Click the 'Start' button and start the test
        cy.contains("Start").click({ force: true }).then(() => {
            // Click all the white tiles until last level
            let level = 1;
            while (level < 50) {
                cy.log(`Level: ${level}`);
                cy.clickVisualWhiteSquares();
                level++;
            }
        });
    });
});
