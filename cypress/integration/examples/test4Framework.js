"use strict";
describe('My Fourth Test Suite', function () {
    before(function () {
        cy.fixture("example.json").then((data) => {
            this.data = data;
        });
    });
    it("Data Driven testing with fixtures", function () {
        cy.visit("https://rahulshettyacademy.com/angularpractice");
        cy.get("form input[name='name']").type(this.data.name);
        cy.get("form select").select(this.data.gender);
    });
});
