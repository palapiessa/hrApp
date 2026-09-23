# Local installation instructions

## Prerequisites

- Node.js and npm

## Install dependencies

From the repository root, install the web application dependencies:

```sh
cd web
npm install
```

## Start the local backend

The backend is a JSON Server API. It uses `web/src/db.json` as its local data store.

In one terminal, from the `web` directory, run:

```sh
npm run server
```

The API is available at:

```text
http://localhost:3001
```

The employee collection is available at:

```text
http://localhost:3001/employees
```

## Start the frontend

In a second terminal, from the `web` directory, run:

```sh
npm run dev
```

Vite starts the React application at:

```text
http://localhost:5173
```

The frontend uses `http://localhost:3001` by default, as configured in `web/src/config.js`.
To use another API without editing the source file, set `VITE_API_URL` when starting Vite:

```sh
VITE_API_URL=https://your-api.example.com npm run dev
```

## Run Playwright tests

From the repository root, install the test dependencies:

```sh
npm --prefix tests install
npx --prefix tests playwright install chromium
```

Run the tests:

```sh
npm --prefix tests test
```

The Playwright configuration starts the frontend automatically at `http://localhost:5173`.
