import Fetch from "../../src/components/Fetch";

describe("a GET request", () => {
  beforeEach(() => {
    cy.fixture("Game").then((game) => {
      cy.intercept("GET", "http://localhost:9999/games", game).as("games");
    });
  });
  it("tests the GET request", () => {
    cy.mount(<Fetch />);
    cy.wait("@games");
  });
});
