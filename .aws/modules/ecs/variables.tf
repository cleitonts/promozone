variable "prefix" { type = string }
variable "region" { type = string }
variable "cluster_name" { type = string }
variable "task_cpu" {
  type    = number
  default = 256
}
variable "task_memory" {
  type    = number
  default = 512
}
variable "desired_count" {
  type    = number
  default = 1
}
variable "ecr_image" { type = string }
variable "app_port" {
  type    = number
  default = 3000
}
variable "subnets" { type = list(string) }
variable "svc_sg_id" { type = string }
variable "target_group_arn" { type = string }
variable "execution_role_arn" { type = string }
variable "task_role_arn" { type = string }
variable "db_host" { type = string }
variable "db_username" { type = string }
variable "db_name" { type = string }
variable "db_password_param_arn" { type = string }
variable "pg_sslmode" {
  type    = string
  default = "require"
}