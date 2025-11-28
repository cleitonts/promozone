variable "region" {
  type    = string
  default = "us-east-1"
}
variable "prefix" {
  type    = string
  default = "promozone"
}

variable "vpc_cidr" {
  type    = string
  default = "10.0.0.0/16"
}
variable "public_subnets" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}
variable "private_subnets" {
  type    = list(string)
  default = ["10.0.3.0/24", "10.0.4.0/24"]
}

variable "app_port" {
  type    = number
  default = 3000
}
variable "db_port" {
  type    = number
  default = 5432
}
variable "health_path" {
  type    = string
  default = "/health"
}

variable "db_password_param_name" {
  type = string
}
variable "db_password_param_value" {
  type    = string
  default = ""
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