# Laboration 1: Fullstack-utveckling with TypeScript

## Features

- Display a custom list of yourfavorite games!
- A POST form for inserting new games
- A PATCH form for updating a game currently on the list
- A DELETE form for deleting a game on the list
- Comes complete with a list on the side for each form for easier handling, no more changing between pages for checking if your request went through!

## Installation

1. Clone this repository
2. Run the queries in "**database.sql**" from the "**database**" folder in your postgreSQL database
3. Install the necessary dependencies on both the frontend and backend folder

```sh
cd frontend
npm install
cd ..
cd backend
npm install
```

4. Navigate back install dependencies on the root folder

```sh
cd ..
npm install
```

5. Package.json on the root folder has been setup to build and run both the frontend and backend "concurrently", simply run "**npm run start**" !

```sh
npm run start
```

## Additional notes

- No .env files are included, have look at **.env.example** inside the **backend** folder for an idea on setting up your enviroment for the backend/database

## Goals achieved

- Frontend/Backend/Database connected to each other
- Front page is presented via a GET method
- Additional CRUD (POST/PATCH/DELETE) operations are included and working
- No .js or .jsx files used
- Props with an interface is utilized
- useState wiht a generic implemented
- An inteface describing what is being fetched from the database has been added
