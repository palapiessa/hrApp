# HR App Workspace

This repository contains two projects:

- `web` - the React and Vite HR application
- `tests` - Playwright end-to-end tests

Open `hrApp.code-workspace` in VS Code to work with both projects.

## Run the app

```sh
npm --prefix web install
npm --prefix web run dev
```

## Run the tests

```sh
npm --prefix tests install
npx --prefix tests playwright install chromium
npm --prefix tests test
```