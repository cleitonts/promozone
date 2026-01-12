terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.113" }
    azuread = { source = "hashicorp/azuread", version = "~> 2.49" }
    time    = { source = "hashicorp/time",    version = "~> 0.11" }
  }
}

provider "azurerm" {
  features {}
  skip_provider_registration = false
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}"
  location = var.location
}

/* outputs moved to containerapps.tf */
output "resource_group" { value = azurerm_resource_group.rg.name }
data "azuread_service_principal" "github_actions" {
  count     = var.github_actions_client_id != "" ? 1 : 0
  client_id = var.github_actions_client_id
}

resource "azurerm_role_assignment" "acr_push" {
  count               = var.github_actions_client_id != "" ? 1 : 0
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPush"
  principal_id         = data.azuread_service_principal.github_actions[0].object_id
}