terraform {
  required_version = ">= 1.6.0"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.113" }
    azuread = { source = "hashicorp/azuread", version = "~> 2.49" }
  }
}

provider "azurerm" {
  features {}
  skip_provider_registration = false
}

provider "azuread" {}

resource "azurerm_resource_group" "rg" {
  name     = "${var.prefix}-rg"
  location = var.location
}

resource "azurerm_container_registry" "acr" {
  name                = "promozone"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
  public_network_access_enabled = true
}

resource "azurerm_log_analytics_workspace" "law" {
  name                = "${var.prefix}-law"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  retention_in_days   = 30
  sku                 = "PerGB2018"
}

resource "azurerm_container_app_environment" "env" {
  name                       = "${var.prefix}-cae"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  log_analytics_workspace_id = azurerm_log_analytics_workspace.law.id
}

resource "azurerm_container_app" "prod" {
  name                         = "${var.prefix}-ca-prod"
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-pwd"
  }

  secret {
    name  = "acr-pwd"
    value = azurerm_container_registry.acr.admin_password
  }

  ingress {
    external_enabled = true
    target_port      = 3000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    container {
      name   = "app"
      image  = "${azurerm_container_registry.acr.login_server}/promozone-backend:prod"
      cpu    = 0.25
      memory = "0.5Gi"
      env {
        name  = "PORT"
        value = "3000"
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
    }
    min_replicas = 0
    max_replicas = 1
  }
}

resource "azurerm_container_app" "stag" {
  name                         = "${var.prefix}-ca-stag"
  resource_group_name          = azurerm_resource_group.rg.name
  container_app_environment_id = azurerm_container_app_environment.env.id
  revision_mode                = "Single"

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-pwd"
  }

  secret {
    name  = "acr-pwd"
    value = azurerm_container_registry.acr.admin_password
  }

  ingress {
    external_enabled = true
    target_port      = 3000
    traffic_weight {
      latest_revision = true
      percentage      = 100
    }
  }

  template {
    container {
      name   = "app"
      image  = "${azurerm_container_registry.acr.login_server}/promozone-backend:stag"
      cpu    = 0.25
      memory = "0.5Gi"
      env {
        name  = "PORT"
        value = "3000"
      }
      env {
        name  = "NODE_ENV"
        value = "production"
      }
    }
    min_replicas = 0
    max_replicas = 1
  }
}

output "acr_login_server" { value = azurerm_container_registry.acr.login_server }
output "container_app_prod_name" { value = azurerm_container_app.prod.name }
output "container_app_stag_name" { value = azurerm_container_app.stag.name }
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