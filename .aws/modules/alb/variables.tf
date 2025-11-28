variable "prefix" { type = string }
variable "vpc_id" { type = string }
variable "subnets" { type = list(string) }
variable "alb_sg_id" { type = string }
variable "app_port" {
  type    = number
  default = 3000
}
variable "health_path" {
  type    = string
  default = "/health"
}