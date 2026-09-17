import argparse
import os
from pathlib import Path

from azure.core.exceptions import ResourceNotFoundError
from azure.identity import DefaultAzureCredential
from azure.mgmt.resource import ResourceManagementClient
from azure.mgmt.web import WebSiteManagementClient
from azure.mgmt.web.models import SkuDescription, StaticSiteARMResource
from dotenv import load_dotenv

load_dotenv(Path(__file__).resolve().parent / ".env")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create the HR App Azure Static Web App if it does not exist."
    )
    parser.add_argument(
        "--subscription-id",
        default=os.getenv("AZURE_SUBSCRIPTION_ID"),
        help="Azure subscription ID (defaults to AZURE_SUBSCRIPTION_ID).",
    )
    parser.add_argument(
        "--resource-group",
        default=os.getenv("AZURE_RESOURCE_GROUP", "frontierweek-hrapp-test-rg"),
        help="Resource group name (default: hrapp-test-rg).",
    )
    parser.add_argument(
        "--name",
        default=os.getenv("AZURE_STATIC_WEB_APP_NAME", "frontierweek-hrapp-test"),
        help="Static Web App name (default: hrapp-test).",
    )
    parser.add_argument(
        "--location",
        default=os.getenv("AZURE_LOCATION", "swedencentral"),
        help="Azure region (default: westeurope).",
    )
    parser.add_argument(
        "--sku",
        choices=("Free", "Standard"),
        default=os.getenv("AZURE_STATIC_WEB_APP_SKU", "Free"),
        help="Static Web Apps SKU (default: Free).",
    )
    args = parser.parse_args()
    if not args.subscription_id:
        parser.error(
            "--subscription-id or the AZURE_SUBSCRIPTION_ID environment variable "
            "is required"
        )
    return args


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

    try:
        static_site = web_client.static_sites.get_static_site(
            args.resource_group,
            args.name,
        )
        print(f"Static Web App '{args.name}' already exists.")
    except ResourceNotFoundError:
        poller = web_client.static_sites.begin_create_or_update_static_site(
            args.resource_group,
            args.name,
            StaticSiteARMResource(
                location=args.location,
                sku=SkuDescription(name=args.sku, tier=args.sku),
                tags={"application": "hrApp", "environment": "test"},
                # Forces a non-empty "properties" object; the API rejects a body without one.
                staging_environment_policy="Enabled",
            ),
        )
        static_site = poller.result()
        print(f"Created Static Web App '{args.name}'.")

    print(f"URL: https://{static_site.default_hostname}")


if __name__ == "__main__":
    main()