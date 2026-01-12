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

  identity { type = "SystemAssigned" }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-pwd"
  }

  secret {
    name  = "acr-pwd"
    value = azurerm_container_registry.acr.admin_password
  }

  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "database-password"
      key_vault_secret_id  = azurerm_key_vault_secret.database_password.versionless_id
      identity             = "System"
    }
  }

  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "jwt-secret"
      key_vault_secret_id  = azurerm_key_vault_secret.jwt_secret.versionless_id
      identity             = "System"
    }
  }

  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "admin-password"
      key_vault_secret_id  = azurerm_key_vault_secret.admin_password.versionless_id
      identity             = "System"
    }
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
      env {
        name  = "DATABASE_TYPE"
        value = coalesce(var.database_type, "postgres")
      }
      env {
        name  = "DATABASE_HOST"
        value = var.database_host
      }
      env {
        name  = "DATABASE_PORT"
        value = var.database_port
      }
      env {
        name  = "DATABASE_USER"
        value = var.database_user
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "DATABASE_PASSWORD"
          secret_name = "database-password"
        }
      }
      env {
        name  = "DATABASE_NAME"
        value = var.database_name
      }
      env {
        name  = "DATABASE_ORM_SYNC"
        value = var.database_orm_sync
      }
      env {
        name  = "PGSSLMODE"
        value = "require"
      }
      env {
        name  = "JWT_EXPIRES_IN"
        value = var.jwt_expires_in
      }
      env {
        name  = "JWT_REFRESH_EXPIRES"
        value = var.jwt_refresh_expires
      }
      env {
        name  = "ADMIN_EMAIL"
        value = var.admin_email
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "JWT_SECRET"
          secret_name = "jwt-secret"
        }
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "ADMIN_PASSWORD"
          secret_name = "admin-password"
        }
      }
      env {
        name  = "BCRYPT_SALT_ROUNDS"
        value = var.bcrypt_salt_rounds
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

  identity { type = "SystemAssigned" }

  registry {
    server               = azurerm_container_registry.acr.login_server
    username             = azurerm_container_registry.acr.admin_username
    password_secret_name = "acr-pwd"
  }

  secret {
    name  = "acr-pwd"
    value = azurerm_container_registry.acr.admin_password
  }

  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "database-password"
      key_vault_secret_id  = azurerm_key_vault_secret.database_password.versionless_id
      identity             = "System"
    }
  }
  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "jwt-secret"
      key_vault_secret_id  = azurerm_key_vault_secret.jwt_secret.versionless_id
      identity             = "System"
    }
  }
  dynamic "secret" {
    for_each = [1]
    content {
      name                 = "admin-password"
      key_vault_secret_id  = azurerm_key_vault_secret.admin_password.versionless_id
      identity             = "System"
    }
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
      env {
        name  = "DATABASE_TYPE"
        value = coalesce(var.database_type, "postgres")
      }
      env {
        name  = "DATABASE_HOST"
        value = var.database_host
      }
      env {
        name  = "DATABASE_PORT"
        value = var.database_port
      }
      env {
        name  = "DATABASE_USER"
        value = var.database_user
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "DATABASE_PASSWORD"
          secret_name = "database-password"
        }
      }
      env {
        name  = "DATABASE_NAME"
        value = var.database_name
      }
      env {
        name  = "DATABASE_ORM_SYNC"
        value = var.database_orm_sync
      }
      env {
        name  = "PGSSLMODE"
        value = "require"
      }
      env {
        name  = "JWT_EXPIRES_IN"
        value = var.jwt_expires_in
      }
      env {
        name  = "JWT_REFRESH_EXPIRES"
        value = var.jwt_refresh_expires
      }
      env {
        name  = "ADMIN_EMAIL"
        value = var.admin_email
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "JWT_SECRET"
          secret_name = "jwt-secret"
        }
      }
      dynamic "env" {
        for_each = [1]
        content {
          name        = "ADMIN_PASSWORD"
          secret_name = "admin-password"
        }
      }
      env {
        name  = "BCRYPT_SALT_ROUNDS"
        value = var.bcrypt_salt_rounds
      }
    }
    min_replicas = 0
    max_replicas = 1
  }
}

resource "azurerm_role_assignment" "kv_secrets_user_prod" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_container_app.prod.identity[0].principal_id
  depends_on           = [azurerm_key_vault.kv]
}

resource "azurerm_role_assignment" "kv_secrets_user_stag" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = azurerm_container_app.stag.identity[0].principal_id
  depends_on           = [azurerm_key_vault.kv]
}

output "acr_login_server" { value = azurerm_container_registry.acr.login_server }
output "container_app_prod_name" { value = azurerm_container_app.prod.name }
output "container_app_stag_name" { value = azurerm_container_app.stag.name }