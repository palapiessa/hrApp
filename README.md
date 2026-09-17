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
az login
export AZURE_SUBSCRIPTION_ID="$(az account show --query id --output tsv)"
python infra/provision_static_web_app.py
```

Optional arguments and their environment variable equivalents:

```sh
python infra/provision_static_web_app.py --help
```

The script creates resource `xxx-test-rg` and static web app`xxx-test`.
It is idempotent and leaves an existing Static Web App unchanged.