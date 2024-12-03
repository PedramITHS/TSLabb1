interface toSend {
  name: string;
  description: string;
  release_date: string;
  banner: string;
}

interface toDelete {
  game_id: number;
}

//data som ska skickas med POST
const sendingGame: toSend = {
  name: "A video game",
  description: "The description of an action video game",
  release_date: "2099-09-09",
  banner: "/images/action.jpg",
};

//data som ska ändras med PATCH
const editGame: toSend = {
  name: "An edited video game",
  description: "The description of an strategy video game",
  release_date: "2599-10-10",
  banner: "/images/strategy.jpg",
};

//lagra id:numret från post
let id: number;

//data som ska tas bort med DELETE
const deletedGame: toDelete = {
  game_id: id,
};

describe("Integration test POST", () => {
  it("performs a GET request", () => {
    cy.request("GET", "http://localhost:3000/games").then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("performs a POST request and retrieve sent data", () => {
    cy.request("POST", "http://localhost:3000/games/post", sendingGame).then(
      (response) => {
        console.log(response.body);
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("name", "A video game");
        id = response.body.game_id;
      }
    );
  });
});

describe("Integration test PATCH", () => {
  it("performs a PATCH request and retrieve sent data", () => {
    cy.request(
      "PATCH",
      `http://localhost:3000/games/patch/${id}`,
      editGame
    ).then((response) => {
      console.log(response.body);
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name", "An edited video game");
    });
  });
});

describe("Integration test DELETE", () => {
  it("performs a DELETE request and confirms deletion of data", () => {
    cy.request(
      "DELETE",
      `http://localhost:3000/games/delete/${id}`,
      deletedGame
    ).then((response) => {
      if (expect(response.status).to.eq(200)) {
        console.log("Successfully deleted!", response.body);
      }
    });
  });
});
