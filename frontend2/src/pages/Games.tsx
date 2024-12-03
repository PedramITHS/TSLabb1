import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";

interface Game {
  game_id: number;
  name: string;
  description: string;
  release_date: string;
  banner: string;
  image: string;
  platform_name: string;
}

export default function Games() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Filtrering av spel via Search komponent som skickas in som props, uttnytjas inte för tillfället.
  // function search(e: React.ChangeEvent<HTMLInputElement>) {
  //   const searchVal = e.target.value;
  //   const filterGames = games.filter((game) =>
  //     game.name.toLowerCase().includes(searchVal.toLowerCase())
  //   );
  //   setGames(filterGames);
  // }

  useEffect(() => {
    // Med generics ställer in så att det vi fetcha:ar ska förväntas vara en array och att det är en array som följer strukturen i  interface:t "Game".
    /////////////////////// axios lösning ////////////////////////////
    axios
      .get<Game[]>("http://localhost:3000/games")
      .then((resp) => {
        console.log("Fetched data:", resp.data);
        if (Array.isArray(resp.data)) {
          setGames(resp.data);
        } else {
          console.error(typeof resp.data);
          console.error("Not correctly set as an array");
        }
        setLoading(false);
      })
      .catch((err: AxiosError) => console.error(`error message: ` + err));
    //////////////////// vanlig fetch lösning /////////////////////////
    // fetch("http://localhost:3000/games")
    //   .then((resp) => resp.json())
    //   .then((result: Game[]) => {
    //     console.log(result);
    //     console.error(typeof result);
    //     setGames(result);
    //     setLoading(false);
    //   })
    //   .catch((err) => console.error(`error message: ` + err));
    /////////////////////////////////////////////
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-border mx-auto my-auto size" role="status">
          <span className="sr-only"></span>
        </div>
      ) : (
        <>
          <h1
            style={{ padding: "4rem 3rem 2rem 3rem" }}
            className="fw-bold text-center"
          >
            Games currently on your list
          </h1>
          <div className="mx-auto w-25 mb-3"></div>
          <div className="card-group mt-2 mb-5 d-flex justify-content-center flex-wrap">
            {games.map((game, index) => (
              <div
                key={index}
                className="shadow-white border border-2 rounded-3 mb-2 mx-1 aCard"
                style={{
                  width: "18rem",
                  boxShadow:
                    "1px 4px 8px 0 rgba(255, 255, 255, 0.493), 0 6px 20px 0 rgba(255, 255, 255, 0.404)",
                }}
              >
                <img
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  src={game.banner}
                  className="card-img-top rounded-top-3"
                  alt={game.name}
                  title={game.name}
                  style={{ height: "159px" }}
                />
                <div className="card-body">
                  <p className="card-title fw-bold text-truncate">
                    {game.name}
                  </p>
                  <p className="card-text text-muted text-truncate">
                    {game.description}
                  </p>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center">
                  <button
                    className="btn btn-dark mt-3 mb-1"
                    data-bs-toggle="modal"
                    data-bs-target={`#gameModal${index}`}
                  >
                    Read more
                  </button>
                </div>
                <div
                  className="modal fade"
                  id={`gameModal${index}`}
                  tabIndex={-1}
                  aria-labelledby={`label${index}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog  modal-dialog-centered  modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title text-center w-100 fw-bold"
                          id={`label${index}`}
                        >
                          {game.name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div
                        className="modal-body"
                        style={{
                          backgroundImage: `url(${game.banner})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          opacity: "0.8",
                        }}
                      >
                        <p
                          style={{
                            backgroundColor: "rgba(0, 0, 0, 0.911)",
                            color: "white",
                            borderRadius: "10px",
                            wordWrap: "break-word",
                          }}
                        >
                          <strong>Description:</strong> <br />{" "}
                          {game.description}
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
