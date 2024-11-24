import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

interface Game {
  game_id: number;
  name: string;
  description: string;
  release_date: string;
  banner: string;
  image: string;
}

interface DelValue {
  game_id: number;
}

export default function Delete() {
  const [del, setDel] = useState<DelValue>({ game_id: 0 });
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  useEffect(() => {
    axios.get("http://localhost:3000/games").then((resp) => {
      console.log("Fetched data:", resp.data);
      if (Array.isArray(resp.data)) {
        setGames(resp.data);
        setLoaded(false);
      } else {
        console.error(typeof resp.data);
        console.error("Not correctly set as an array");
      }
    });
  }, []);

  const changeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setDel((prevValue) => ({
      ...prevValue,
      [name]: Number(value),
    }));
  };

  const consolLogVal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(del);
    axios
      .delete<DelValue[]>(`http://localhost:3000/games/delete/${del.game_id}`, {
        data: del,
      })
      .then((resp) => {
        console.log("Fetched data:", resp.data);
      })
      .catch((error: AxiosError) => {
        if (error.response) {
          console.error("Server status:", error.response.status);
        }
      });
  };

  return (
    <>
      <h1 className="mt-5">Delete Form</h1>
      <div
        className="container col-md-12 col-lg-12 mx-auto my-5 d-flex flex-column"
        style={{ gap: "10px" }}
      >
        <div
          className="d-flex flex-column flex-grow-1"
          style={{ height: "220px", maxWidth: "450px", padding: "10px" }}
        >
          <Form
            style={{
              boxShadow:
                "1px 4px 8px 0 rgba(255, 255, 255, 0.493), 0 6px 20px 0 rgba(255, 255, 255, 0.404)",
              maxHeight: "220px",
              borderRadius: "10px",
            }}
            className="w-100 p-3"
            onSubmit={consolLogVal}
          >
            <Form.Group className="mb-3">
              <Form.Label>Enter ID:</Form.Label>
              <Form.Control
                required
                name="game_id"
                onChange={changeVal}
                id="game_id"
                className="col-md-6 w-50 text-center mx-auto"
                placeholder="Id..."
                type="number"
                value={del.game_id}
              />
            </Form.Group>
            <button type="submit">Delete it!</button>
          </Form>
        </div>
        {loaded ? (
          <div className="spinner-border mx-auto" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div
            style={{
              overflowY: "scroll",
              height: "220px",
              maxWidth: "450px",
              padding: "10px",
              boxShadow:
                "1px 4px 8px 0 rgba(255, 255, 255, 0.493), 0 6px 20px 0 rgba(255, 255, 255, 0.404)",
              borderRadius: "10px",
            }}
          >
            {games.map((game, index) => (
              <div key={index}>
                <p className="fw-bold">{`ID: ${game.game_id}`}</p>
                <p>{`Name: ${game.name}`}</p>
                <p>{`Description: ${game.description}`}</p>
                <p>{`Release Date: ${game.release_date}`}</p>
                <p>{`Banner: ${game.banner}`}</p>
                <p>{`Image: ${game.image}`}</p>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
