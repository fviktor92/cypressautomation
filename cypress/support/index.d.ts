// in cypress/support/index.d.ts
// load type definitions that come with Cypress module
/// <reference types="cypress" />
declare namespace Cypress {
    interface Chainable {
        selectProduct(value: string): Chainable<Element>;
        hitTargets(): Chainable<Element>;
        clickChimpanzeeTiles(): Chainable<Element>;
        clickVisualWhiteSquares(): Chainable<Element>;
        typeNumbers(): Chainable<Element>;
        logHumanBenchmarkResults(value: string): Chainable<Element>;
    }
}
