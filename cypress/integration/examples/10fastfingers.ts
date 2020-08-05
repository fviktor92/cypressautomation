describe("10 fast fingers", function (): void
{
    it("Hungarian", function (): void
    {
        cy.visit("https://10fastfingers.com/typing-test/hungarian");
        cy.get("#CybotCookiebotDialogBodyLevelButtonAccept").click();

        let words: string = "";
        cy.get("#words span").each((word: JQuery<HTMLElement>) =>
        {
            words = words.concat(word.text()).concat(" ");
        }).then(() =>
        {
            cy.get("#inputfield").type(words);
        });
    });
});