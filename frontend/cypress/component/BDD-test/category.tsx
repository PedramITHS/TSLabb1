import {
  When,
  Then,
  Given,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.visit("http://localhost:5173/");
});

Given("Jag är på sök sidan med en knappen som visar 'Action'", () => {
  cy.get('button[name="action"]').should("be.visible");
});

When("Jag klickar på knappen", () => {
  cy.get('button[name="action"]').click();
});

Then("Ska lista spel från kategori 'Action'", () => {
  cy.get(".aCard[value='Action']").should("be.visible");
});
