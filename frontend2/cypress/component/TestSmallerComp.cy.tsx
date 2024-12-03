import Navbar from "../../src/components/Navbar";
import Mode from "../../src/components/Mode";

describe("the footer", () => {
  it("tests the footer", () => {
    cy.mount(<Navbar />);
    cy.get(".navbar").should("exist");
  });
});

describe("the light & dark mode", () => {
  it("the light toggler", () => {
    cy.mount(<Mode switchOn={true} />);
    cy.get("button[id=toastTrigger]").should("have.attr", "value", "dark");
    cy.get("button[id=toastTrigger]")
      .click()
      .should("have.attr", "value", "light");
  });
});
