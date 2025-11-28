variable "db_password_param_name" {
  type = string
}
variable "create_db_password_param" {
  type    = bool
  default = false
}
variable "db_password_param_value" {
  type    = string
  default = ""
}