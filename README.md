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

## Provision Azure Static Web Apps

The provisioning script uses `DefaultAzureCredential`. For local use, sign in
with Azure CLI and provide the target subscription:

```sh
python3 -m venv .venv
. .venv/bin/activate
pip install -r infra/requirements.txt
az login --tenant <your tenant ID>
- login with Edge
- set subscription ID to .env
.venv/bin/python infra/provision_static_web_app.py
```

Optional arguments and their environment variable equivalents:

```sh
python infra/provision_static_web_app.py --help
```

The script creates resource `frontierweek-hrapp-test-rg` and static web app`frontierweek-hrapp-test`.
It is idempotent and leaves an existing Static Web App unchanged.

## Provision and deploy the backend API

The `json-server` API (backed by `web/src/db.json`) can be deployed to an
Azure App Service Linux web app:

```sh
.venv/bin/python infra/provision_backend.py
```

This creates (if missing) an App Service plan and web app, then zip-deploys
`server/package.json` plus a copy of `web/src/db.json`. It prints the API
URL on success, e.g. `https://frontierweek-hrapp-test-api.azurewebsites.net`.
Use that as `VITE_API_URL` when building/deploying the frontend.

It is idempotent for the App Service resources; each run re-deploys the
latest `db.json` content.
