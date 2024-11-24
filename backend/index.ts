import cors from "cors";
import express, { Request, Response, Application, query } from "express";
import { Client } from "pg";
import * as dotenv from "dotenv";

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

const app: Application = express();
const port: number = 3000;

app.use(cors());
app.use(express.json());

enum HttpCode {
  serverFail = 500,
  clientFail = 404,
  Success = 200,
}

interface Game {
  game_id: number;
  name: string;
  description: string;
  release_date: string;
  banner: string;
  image: string;
  platform: string;
}

interface Del {
  game_id: number;
}

app.get("/", (req: Request, res: Response): void => {
  res.send("Success!");
});

app.get("/games", async (req: Request, res: Response): Promise<void> => {
  try {
    // const { rows } = await client.query<Game>(
    //   `SELECT games.name AS game_name, games.description, games.release_date, games.banner, games.image, platforms.name AS platform_name FROM platGames JOIN games ON platGames.game_id = games.game_id JOIN platforms ON platGames.platform_id = platforms.platform_id`
    // );
    const { rows } = await client.query<Game>(`SELECT * from games`);
    res.status(HttpCode.Success).send(rows);
  } catch (error: any) {
    res
      .status(HttpCode.serverFail)
      .send({ message: " Error fetching data", error: error.message });
  }
});

app.post("/games/post", async (req: Request, res: Response): Promise<void> => {
  const { name, description, release_date, banner, image } = req.body;
  const query: string = `INSERT INTO games (name, description, release_date, banner, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values: Array<string> = [
    name,
    description,
    release_date,
    banner,
    image,
  ];
  try {
    const { rows } = await client.query<Game>(query, values);
    res.status(HttpCode.Success).send(rows);
  } catch (error) {
    console.log(error);
    res
      .status(HttpCode.serverFail)
      .send({ message: " Error fetching data", error: error });
  }
});

app.patch(
  "/games/patch/:id",
  async (req: Request, res: Response): Promise<void> => {
    const game_id: number = parseInt(req.params.id, 10);
    const { name, description, release_date, banner, image } = req.body;
    const query: string = `UPDATE games SET
  name = COALESCE(NULLIF($1, ''), name),
  description = COALESCE(NULLIF($2, ''), description),
  release_date = COALESCE(NULLIF($3, ''), release_date),
  banner = COALESCE(NULLIF($4, ''), banner),
  image = COALESCE(NULLIF($5, ''), image)
  WHERE game_id = $6 RETURNING *`;
    const values: Array<string | number> = [
      name,
      description,
      release_date,
      banner,
      image,
      game_id,
    ];

    try {
      const update = await client.query<Game>(query, values);
      if (update.rowCount! > 0) {
        res.status(HttpCode.Success).send(update.rows);
      } else {
        res.status(HttpCode.clientFail).send({ message: "Incorrect input" });
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(HttpCode.serverFail)
        .send({ message: " Error fetching data", error: error.message });
    }
  }
);

app.delete(
  "/games/delete/:id",
  async (req: Request, res: Response): Promise<void> => {
    const game_id = parseInt(req.params.id, 10);
    const query: string = `DELETE FROM games WHERE game_id = $1 RETURNING *`;
    const values: Array<number> = [game_id];
    try {
      const deleted = await client.query<Del>(query, values);
      if (deleted.rowCount === 0) {
        res.status(HttpCode.clientFail).send({ message: "Incorrect input" });
      } else {
        res.status(HttpCode.Success).send(deleted.rows);
      }
    } catch (error: any) {
      res
        .status(HttpCode.serverFail)
        .send({ message: " Error fetching data", error: error.message });
    }
  }
);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
