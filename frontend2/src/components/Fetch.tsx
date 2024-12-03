import { useEffect, useState } from "react";

interface Game {
  game_id: number;
  name: string;
  description: string;
  release_date: string;
  banner: string;
  image: string;
  platform_name: string;
}

export default function Fetch() {
  const [games, setGames] = useState<Array<Game>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:9999/games")
      .then((resp) => resp.json())
      .then((result: Game[]) => {
        console.log(result);
        console.error(typeof result);
        setGames(result);
        setLoading(false);
      })
      .catch((err) => console.error(`error message: ` + err));
  }, []);

  return (
    <div>
      <h1>Games</h1>
      {loading && <p>Loading...</p>}
      {games.map((game) => (
        <div key={game.game_id}>
          <h2 id="name">{game.name}</h2>
          <p id="description">{game.description}</p>
          <p id="release">{game.release_date}</p>
          <img id="banner" width={300} height={200} src={game.banner}></img>
        </div>
      ))}
    </div>
  );
}
