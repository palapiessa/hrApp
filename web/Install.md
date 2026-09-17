# Local installation instructions

## Backend server

The project contains 

- Backend data: `db.json`
- Backend dependency: `json-server`

- install dependencies with: `npm install` 
- Start script: `npm run server`, serving on `http://localhost:3001`
- Frontend API configuration: `config.js`, currently pointing to the deployed Render API at `https://hrapp-bec7.onrender.com`

The backend is provided by JSON Server rather than custom Express or Node.js code.

## Frontend
To use the local JSON Server, point config.js to:  `export const API_URL = 'http://localhost:3001';`
Run in separate terminal: `npm run dev`

Vite will start the React frontend, usually at: `http://localhost:5173`
