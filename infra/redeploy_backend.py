from pathlib import Path
import os
import shutil
import zipfile
import requests

from azure.identity import DefaultAzureCredential
from azure.mgmt.web import WebSiteManagementClient

from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

REPO_ROOT = Path(__file__).resolve().parent.parent

SERVER_DIR = REPO_ROOT / "server"
DB_SOURCE = REPO_ROOT / "web" / "src" / "db.json"

SUBSCRIPTION_ID = os.getenv("AZURE_SUBSCRIPTION_ID")
RESOURCE_GROUP = os.getenv(
    "AZURE_BACKEND_RESOURCE_GROUP",
    "hrapp-test-rg"
)
APP_NAME = os.getenv(
    "AZURE_BACKEND_APP_NAME",
    "frontierweek-hrapp-test-api"
)


def build_zip():
    shutil.copyfile(
        DB_SOURCE,
        SERVER_DIR / "db.json"
    )

    zip_path = SERVER_DIR / "deploy.zip"

    if zip_path.exists():
        zip_path.unlink()

    with zipfile.ZipFile(
        zip_path,
        "w",
        zipfile.ZIP_DEFLATED
    ) as archive:
        archive.write(
            SERVER_DIR / "package.json",
            arcname="package.json"
        )
        archive.write(
            SERVER_DIR / "db.json",
            arcname="db.json"
        )

    return zip_path


def main():
    credential = DefaultAzureCredential()

    web_client = WebSiteManagementClient(
        credential,
        SUBSCRIPTION_ID
    )

    credentials = (
        web_client.web_apps
        .begin_list_publishing_credentials(
            RESOURCE_GROUP,
            APP_NAME
        )
        .result()
    )

    zip_path = build_zip()

    zip_deploy_url = (
        f"https://{APP_NAME}"
        ".scm.azurewebsites.net/api/zipdeploy"
    )

    print(
        f"Redeploying db.json to {APP_NAME}..."
    )

    with open(zip_path, "rb") as zip_file:

        response = requests.post(
            zip_deploy_url,
            auth=(
                credentials.publishing_user_name,
                credentials.publishing_password
            ),
            data=zip_file,
            headers={
                "Content-Type": "application/zip"
            },
            timeout=180
        )

    response.raise_for_status()

    print("Backend redeployed successfully.")
    print(
        f"https://{APP_NAME}.azurewebsites.net"
    )


if __name__ == "__main__":
    main()