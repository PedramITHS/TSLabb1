import axios, { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import { Form } from "react-bootstrap";

interface Game {
  game_id: number;
  name: string;
  description: string;
  release_date: string;
  banner: string;
  image: string;
}

interface PatchValue {
  game_id: number;
  name?: string;
  description?: string;
  release_date?: string;
  banner?: string;
  image?: string;
}

export default function Patch() {
  const [patch, setPatch] = useState<PatchValue>({
    name: "",
    description: "",
    release_date: "",
    banner: "",
    image: "",
    game_id: 0,
  });
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState<boolean>(true);

  const changeVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPatch((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPatch((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const changeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPatch((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const consolLogVal = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(patch);
      axios
        .patch<PatchValue[]>(
          `http://localhost:3000/games/patch/${patch.game_id}`,
          patch
        )
        .then((resp) => {
          console.log("Fetched data:", resp.data);
          setLoaded(true);
        })
        .catch((error: AxiosError) => {
          console.error("Error fetching data:", error);
        });
    },
    [patch]
  );

  useEffect(() => {
    axios.get("http://localhost:3000/games").then((resp) => {
      if (Array.isArray(resp.data)) {
        setLoaded(false);
        setGames(resp.data);
      } else {
        console.error(typeof resp.data);
        console.error("Not correctly set as an array");
      }
    });
  }, [loaded]);

  return (
    <>
      <h1>Patch Form</h1>
      <div className="container col-md-12 col-lg-12 mx-auto my-5 d-flex flex-row gap-3">
        <Form
          style={{
            marginBottom: "60px",
            borderRadius: "10px",
            boxShadow:
              "1px 4px 8px 0 rgba(255, 255, 255, 0.493), 0 6px 20px 0 rgba(255, 255, 255, 0.404)",
          }}
          className="w-100 p-3"
          onSubmit={consolLogVal}
        >
          <Form.Group className="mb-3">
            <Form.Label>Enter ID:</Form.Label>
            <Form.Control
              name="game_id"
              value={patch.game_id}
              onChange={changeVal}
              id="postId"
              className="col-md-6 text-center mx-auto"
              type="number"
              placeholder="Id..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Name:</Form.Label>
            <Form.Control
              name="name"
              value={patch.name}
              onChange={changeVal}
              id="postName"
              className="col-md-6"
              type="text"
              placeholder="Enter..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Description</Form.Label>
            {/* <Form.Control
              name="description"
              value={patch.description}
              onChange={changeVal}
              id="postDescription"
              className="col-md-6"
              type="text"
              placeholder="Enter..."
            /> */}
            <textarea
              name="description"
              value={patch.description}
              onChange={changeArea}
              className="form-control"
              id="postDescription"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Release Date</Form.Label>
            <Form.Control
              name="release_date"
              value={patch.release_date}
              onChange={changeVal}
              id="postReleaseDate"
              className="col-md-6"
              type="date"
              placeholder="Enter..."
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter banner Image</Form.Label>
            {/* <Form.Control
              name="banner"
              value={patch.banner}
              onChange={changeVal}
              id="postBanner"
              className="col-md-6"
              type="text"
              placeholder="Enter..."
            /> */}
            <select
              id="postBanner"
              value={patch.banner}
              name="banner"
              onChange={changeSelect}
              className="form-select"
              aria-label="select"
            >
              <option defaultValue={""}>Select genre for banner</option>
              <option value="/images/platform.jpg">Platform</option>
              <option value="/images/music.jpg">Music</option>
              <option value="/images/shooter.jpg">Shooter</option>
              <option value="/images/rpg.jpg">RPG</option>
              <option value="/images/racing.png">Racing</option>
              <option value="/images/strategy.jpg">Strategy</option>
              <option value="/images/action.jpg">Action</option>
              <option value="/images/fighting.jpg">Fighting</option>
              <option value="/images/puzzle.jpg">Puzzle</option>
              <option value="/images/mmo.jpg">MMO</option>
            </select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Enter Cover Image</Form.Label>
            <Form.Control
              name="image"
              value={patch.image}
              onChange={changeVal}
              id="postImage"
              className="col-md-6"
              type="text"
              placeholder="Enter..."
            />
          </Form.Group>
          <button type="submit">Patch it!</button>
        </Form>
        {loaded ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div
            style={{
              overflowY: "scroll",
              height: "290px",
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
