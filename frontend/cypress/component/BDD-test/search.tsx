import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://localhost:5173/");
});

Given("I am on the search Jag är på sidan med formulären/tom sökfält", () => {
  cy.get('input[name="search"]').should("be.visible");
});

When("Jag fyller i sök fälten för namn och klickar på knappen", () => {
  cy.get('input[name="search"]').type("Neo Contra");
  cy.get('button[type="submit"]').click();
});

Then("En eller flera spel ska visas", () => {
  cy.get(".aCard").should("be.visible");
});
