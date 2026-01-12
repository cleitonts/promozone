variable "prefix" { 
  type    = string
  default = "promozone"
}

variable "location" { 
  type    = string
  default = "uksouth"
}

variable "github_actions_client_id" {
  type    = string
  default = ""
}

variable "database_password" {
  type    = string
  default = ""
}

variable "jwt_secret" {
  type    = string
  default = ""
}

variable "admin_password" {
  type    = string
  default = ""
}

variable "database_type" {
  type    = string
  default = ""
}

variable "database_host" {
  type    = string
  default = ""
}

variable "database_user" {
  type    = string
  default = ""
}

variable "database_name" {
  type    = string
  default = ""
}

variable "database_port" {
  type    = string
  default = "5432"
}

variable "database_orm_sync" {
  type    = string
  default = "true"
}

variable "jwt_expires_in" {
  type    = string
  default = "10m"
}

variable "jwt_refresh_expires" {
  type    = string
  default = "20m"
}

variable "bcrypt_salt_rounds" {
  type    = string
  default = "10"
}

variable "admin_email" {
  type    = string
  default = ""
}
