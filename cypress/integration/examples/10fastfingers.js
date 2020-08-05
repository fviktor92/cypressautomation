"use strict";
describe("10 fast fingers", function () {
    it("Hungarian", function () {
        cy.visit("https://10fastfingers.com/typing-test/hungarian");
        cy.get("#CybotCookiebotDialogBodyLevelButtonAccept").click();
        let words = "";
        cy.get("#words span").each((word) => {
            words = words.concat(word.text()).concat(" ");
        }).then(() => {
            cy.get("#inputfield").type(words);
        });
    });
});
