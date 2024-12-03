import Fetch from "../../src/components/Fetch";

describe("a GET request", () => {
  it("tests the GET request", () => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:9999/games",
      },
      {
        body: [
          {
            id: 1,
            name: "A video game",
            description: "The description of the video game",
            release_date: "2222-12-22",
            banner: "/images/rpg.jpg",
          },
        ],
      }
    ).as("games");
    cy.mount(<Fetch />);
    cy.wait("@games");

    cy.get("h2").should("have.text", "A video game");
    cy.get("p[id=description]").should(
      "have.text",
      "The description of the video game"
    );
    cy.get("p[id=release]").should("have.text", "2222-12-22");
    cy.get("img").should("have.attr", "src", "/images/rpg.jpg");
  });
});
