/// <reference path="../../support/index.d.ts" />

describe("Human Benchmark test", function (): void
{
    it("Reaction Time", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/reactiontime");

        // Start the reaction time test
        cy.contains("Reaction Time Test").click({force: true});

        // When it turns green the text "Click!" appears
        cy.contains("Click!").click({force: true});

        // Take the result and print
        cy.logHumanBenchmarkResults("h1:nth-child(1) > div");
    });

    it("Aim Trainer", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/aim");

        // Start the aim trainer by clicking the target
        cy.get("div[data-aim-target='true']").as("target").click({force: true});
        cy.hitTargets();
        cy.logHumanBenchmarkResults("div[data-test='true']");
    });

    it("Are you smarter than a chimpanzee?", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/chimp");

        // Start the test
        cy.contains("Start Test").click({force: true});
        cy.clickChimpanzeeTiles();
    });

    it("Visual Memory Test", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/memory");

        // Click the 'Start' button and start the test
        cy.contains("Start").click({force: true});
        cy.clickVisualWhiteSquares();
    });

    it("Typing Test", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/typing");

        // Just start typing
        cy.get(".letters").as("letters").invoke("text").then((innerText: string): void =>
        {
            cy.get("@letters").type(innerText);
        });
        cy.logHumanBenchmarkResults("div[data-test='true'] h1");
    });

    it.only("Number memory", function (): void
    {
        cy.visit("https://humanbenchmark.com/tests/number-memory");

        // Click the 'Start' button and type the numbers
        cy.contains("Start").click({force: true});
        cy.typeNumbers();
    });
});