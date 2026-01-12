data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "kv" {
  name                       = "${var.prefix}-kv"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
  tenant_id                  = data.azurerm_client_config.current.tenant_id
  sku_name                   = "standard"
  enable_rbac_authorization  = true
  purge_protection_enabled   = false
  soft_delete_retention_days = 7
  public_network_access_enabled = true

  network_acls {
    default_action = "Allow"
    bypass         = "AzureServices"
  }
}

resource "azurerm_key_vault_secret" "database_password" {
  name         = "database-password"
  value        = var.database_password
  key_vault_id = azurerm_key_vault.kv.id
  content_type = "text"
  depends_on   = [time_sleep.kv_admin_propagation]
}

resource "azurerm_key_vault_secret" "jwt_secret" {
  name         = "jwt-secret"
  value        = var.jwt_secret
  key_vault_id = azurerm_key_vault.kv.id
  content_type = "text"
  depends_on   = [time_sleep.kv_admin_propagation]
}

resource "azurerm_key_vault_secret" "admin_password" {
  name         = "admin-password"
  value        = var.admin_password
  key_vault_id = azurerm_key_vault.kv.id
  content_type = "text"
  depends_on   = [time_sleep.kv_admin_propagation]
}

resource "azurerm_role_assignment" "kv_admin_current_principal" {
  scope                = azurerm_key_vault.kv.id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azurerm_client_config.current.object_id
  depends_on           = [azurerm_key_vault.kv]
}

resource "time_sleep" "kv_admin_propagation" {
  create_duration = "60s"
  depends_on      = [
    azurerm_role_assignment.kv_admin_current_principal,
  ]
}

output "key_vault_name" { value = azurerm_key_vault.kv.name }