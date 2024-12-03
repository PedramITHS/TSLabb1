describe("Tests to run", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("opens and closes the navigation offcanvas", () => {
    cy.get(".offcanvas").should("not.exist");
    cy.get(".navbar-toggler").click();
    cy.get(".offcanvas").should("exist");
  });

  it("Tests light and dark mode toggle", () => {
    cy.get(".lights").click();
    cy.get(".lights").should("have.text", "Dark mode");
    cy.get("body")
      .should("have.attr", "style")
      .and("equal", "background-color: rgb(89, 90, 92);");
    cy.get(".lights").click();
    cy.get(".lights").should("have.text", "Light mode");
    cy.get("body")
      .should("have.attr", "style")
      .and("equal", "background-color: rgb(158, 158, 158);");
  });

  it("navigates back and forth between POST and GAMES, performing a POST request", () => {
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("POST").click();
    // Fält fylls inte in ibland, kan bero på att cypress
    //är för snabb eller att form-fälten inte hinner ladda upp i tid.
    cy.wait(500);
    cy.get("h1").contains("Post Form").should("exist");
    cy.get("input[name=name]", { timeout: 15000 })
      .should("exist")
      .and("be.visible")
      .type("Gran Turismo")
      .should("have.value", "Gran Turismo");
    cy.get("textarea[name=description]")
      .type("A racing game")
      .should("have.value", "A racing game");
    cy.get("input[name=release_date]")
      .type("2022-01-01")
      .should("have.value", "2022-01-01");
    cy.get("select[name=banner]")
      .select(5)
      .invoke("val")
      .should("equal", "/images/racing.png");
    cy.get("button[type=submit]").click();
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      expect(response.body[response.body.length - 1].name).to.eq(
        "Gran Turismo"
      );
    });
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("Games").click();
    cy.get(".aCard").last().contains("Gran Turismo").should("exist");
  });

  it("navigates back and forth between PATCH and GAMES, performing a PATCH request", () => {
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("PATCH").click();
    cy.wait(500);
    cy.get("h1").contains("Patch Form").should("exist");
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      const id = response.body[response.body.length - 1].game_id;
      console.log(id);
      cy.get("input[name=game_id]")
        .should("exist")
        .and("be.visible")
        .clear()
        .type(`${id}`);
    });
    cy.get("input[name=name]")
      .should("exist")
      .and("be.visible")
      .type("CTR: Crash Team Racing")
      .should("have.value", "CTR: Crash Team Racing");
    cy.get("textarea[name=description]")
      .type("A racing game, edited")
      .should("have.value", "A racing game, edited");
    cy.get("input[name=release_date]")
      .type("1999-01-01")
      .should("have.value", "1999-01-01");
    cy.get("select[name=banner]")
      .select(5)
      .invoke("val")
      .should("equal", "/images/racing.png");
    cy.get("button[type=submit]").click();
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      expect(response.body[response.body.length - 1].name).to.eq(
        "CTR: Crash Team Racing"
      );
    });
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("Games").click();
    cy.get(".aCard").last().contains("CTR: Crash Team Racing").should("exist");
  });

  it("navigates back and forth between DELETE and GAMES, performing a DELETE request", () => {
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("DELETE").click();
    cy.wait(500);
    cy.get("h1").contains("Delete Form").should("exist");
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      const id = response.body[response.body.length - 1].game_id;
      console.log(id);
      cy.get("input[name=game_id]")
        .should("exist")
        .and("be.visible")
        .clear()
        .type(`${id}`);
    });
    cy.get("button[type=submit]").click();
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      expect(response.body.length).to.greaterThan(0);
    });
    cy.get(".navbar-toggler").click();
    cy.get("a").contains("Games").click();
    cy.get(".aCard")
      .last()
      .contains("CTR: Crash Team Racing")
      .should("not.exist");
  });
});
