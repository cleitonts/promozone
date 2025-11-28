variable "prefix" { type = string }
variable "private_subnets" { type = list(string) }
variable "db_port" {
  type    = number
  default = 5432
}
variable "db_username" {
  type    = string
  default = "app_user"
}
variable "db_name" {
  type    = string
  default = "appdb"
}
variable "db_instance_class" {
  type    = string
  default = "db.t3.micro"
}
variable "db_allocated_storage" {
  type    = number
  default = 20
}
variable "db_backup_retention_days" {
  type    = number
  default = 7
}
variable "db_sg_id" { type = string }
variable "db_password_value" { type = string }