import argparse
import os
import shutil
import sys
import time
import zipfile
from pathlib import Path

import requests
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.web import WebSiteManagementClient
from azure.mgmt.web.models import (
    AppServicePlan,
    CsmPublishingCredentialsPoliciesEntity,
    NameValuePair,
    Site,
    SiteConfig,
    SkuDescription,
)
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")

REPO_ROOT = Path(__file__).resolve().parent.parent
SERVER_DIR = REPO_ROOT / "server"
DB_SOURCE = REPO_ROOT / "web" / "src" / "db.json"


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create (if needed) and deploy the HR App json-server API to Azure App Service."
    )
    parser.add_argument(
        "--subscription-id",
        default=os.getenv("AZURE_SUBSCRIPTION_ID"),
        help="Azure subscription ID (defaults to AZURE_SUBSCRIPTION_ID).",
    )
    parser.add_argument(
        "--resource-group",
        default=os.getenv("AZURE_BACKEND_RESOURCE_GROUP", os.getenv("AZURE_RESOURCE_GROUP", "hrapp-test-rg")),
        help="Resource group name.",
    )
    parser.add_argument(
        "--plan-name",
        default=os.getenv("AZURE_APP_SERVICE_PLAN_NAME", "hrapp-test-plan"),
        help="App Service plan name (default: hrapp-test-plan).",
    )
    parser.add_argument(
        "--name",
        default=os.getenv("AZURE_BACKEND_APP_NAME", "hrapp-test-api"),
        help="Web App (API) name (default: hrapp-test-api). Must be globally unique.",
    )
    parser.add_argument(
        "--location",
        default=os.getenv("AZURE_LOCATION", "swedencentral"),
        help="Azure region (default: swedencentral).",
    )
    parser.add_argument(
        "--sku",
        default=os.getenv("AZURE_APP_SERVICE_SKU", "F1"),
        help="App Service plan SKU, e.g. F1 (free) or B1 (basic). Default: F1.",
    )
    args = parser.parse_args()
    if not args.subscription_id:
        parser.error(
            "--subscription-id or the AZURE_SUBSCRIPTION_ID environment variable "
            "is required"
        )
    return args


def build_deployment_zip() -> Path:
    shutil.copyfile(DB_SOURCE, SERVER_DIR / "db.json")
    zip_path = SERVER_DIR / "deploy.zip"
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as archive:
        for file_name in ("package.json", "db.json"):
            archive.write(SERVER_DIR / file_name, arcname=file_name)
    return zip_path


def main() -> None:
    args = parse_args()
    credential = DefaultAzureCredential()
    resource_client = ResourceManagementClient(credential, args.subscription_id)
    web_client = WebSiteManagementClient(credential, args.subscription_id)

    if resource_client.resource_groups.check_existence(args.resource_group):
        print(f"Resource group '{args.resource_group}' already exists.")
    else:
        resource_client.resource_groups.create_or_update(
            args.resource_group,
            {"location": args.location},
        )
        print(f"Created resource group '{args.resource_group}'.")

    plan = web_client.app_service_plans.begin_create_or_update(
        args.resource_group,
        args.plan_name,
        AppServicePlan(
            location=args.location,
            reserved=True,
            sku=SkuDescription(name=args.sku, tier=args.sku),
        ),
    ).result()
    print(f"App Service plan '{args.plan_name}' ready.")

    web_client.web_apps.begin_create_or_update(
        args.resource_group,
        args.name,
        Site(
            location=args.location,
            server_farm_id=plan.id,
            reserved=True,
            https_only=True,
            site_config=SiteConfig(
                linux_fx_version="NODE|20-lts",
                always_on=args.sku != "F1",
                app_settings=[
                    NameValuePair(name="SCM_DO_BUILD_DURING_DEPLOYMENT", value="true"),
                ],
            ),
        ),
    ).result()
    print(f"Web App '{args.name}' ready.")

    # New web apps disable SCM basic auth by default; zip deploy needs it enabled.
    web_client.web_apps.update_scm_allowed(
        args.resource_group,
        args.name,
        CsmPublishingCredentialsPoliciesEntity(allow=True),
    )

    credentials = web_client.web_apps.begin_list_publishing_credentials(
        args.resource_group,
        args.name,
    ).result()

    zip_path = build_deployment_zip()
    auth = (credentials.publishing_user_name, credentials.publishing_password)
    url = f"https://{args.name}.scm.azurewebsites.net/api/zipdeploy"

    # Enabling SCM basic auth takes a few seconds to propagate; retry on 401.
    attempts = 5
    for attempt in range(1, attempts + 1):
        with open(zip_path, "rb") as zip_file:
            response = requests.post(
                url,
                auth=auth,
                data=zip_file,
                headers={"Content-Type": "application/zip"},
                timeout=180,
            )
        if response.status_code < 300:
            break
        if response.status_code == 401 and attempt < attempts:
            time.sleep(10)
            continue
        print(f"Deployment failed: {response.status_code} {response.text}", file=sys.stderr)
        sys.exit(1)

    print(f"Deployed API to https://{args.name}.azurewebsites.net")


if __name__ == "__main__":
    main()
