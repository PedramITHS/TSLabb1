describe("Tests to run", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("opens and closes the navigation offcanvas", () => {
    cy.get(".offcanvas").should("not.exist");
    cy.get(".navbar-toggler").click();
    cy.get(".offcanvas").should("exist");
  });

  it("navigates back and forth between POST and GAMES", () => {
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("POST").click();
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("Games").click();
  });

  it("Tests light and dark mode toggle", () => {
    cy.get(".lights").click();
    cy.get(".lights").should("have.text", "Light mode");
    cy.get("body")
      .should("have.attr", "style")
      .and("equal", "background-color: rgb(158, 158, 158);");
    cy.get(".lights").click();
    cy.get(".lights").should("have.text", "Dark mode");
    cy.get("body")
      .should("have.attr", "style")
      .and("equal", "background-color: rgb(89, 90, 92);");
  });
});
