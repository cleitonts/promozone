terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
}

provider "aws" {
  region = var.region
}

data "aws_caller_identity" "current" {}

data "aws_availability_zones" "available" {}

module "vpc" {
  source = "./modules/vpc"

  prefix             = var.prefix
  vpc_cidr           = var.vpc_cidr
  public_subnets     = var.public_subnets
  private_subnets    = var.private_subnets
  availability_zones = slice(data.aws_availability_zones.available.names, 0, 2)
}

module "sg" {
  source = "./modules/sg"

  prefix   = var.prefix
  vpc_id   = module.vpc.vpc_id
  app_port = var.app_port
  db_port  = var.db_port
}

module "alb" {
  source = "./modules/alb"

  prefix      = var.prefix
  vpc_id      = module.vpc.vpc_id
  subnets     = module.vpc.public_subnets
  alb_sg_id   = module.sg.alb_sg_id
  app_port    = var.app_port
  health_path = var.health_path
}

module "ssm" {
  source = "./modules/ssm"

  db_password_param_name = var.db_password_param_name
  create_db_password_param = var.db_password_param_value != ""
  db_password_param_value  = var.db_password_param_value
}

module "iam" {
  source = "./modules/iam"

  prefix = var.prefix
  github_deploy_role_name    = "github-backend-deploy"
  github_org                 = "cleitonrc"
  github_repo                = "promozone"
  github_ref                 = "refs/heads/main"
  github_oidc_provider_arn   = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:oidc-provider/token.actions.githubusercontent.com"
}

module "rds" {
  source = "./modules/rds"

  prefix                   = var.prefix
  private_subnets          = module.vpc.private_subnets
  db_port                  = var.db_port
  db_username              = var.db_username
  db_name                  = var.db_name
  db_instance_class        = var.db_instance_class
  db_allocated_storage     = var.db_allocated_storage
  db_backup_retention_days = var.db_backup_retention_days
  db_sg_id                 = module.sg.db_sg_id
  db_password_value        = module.ssm.db_password_value
}

module "ecr" {
  source = "./modules/ecr"

  prefix = var.prefix
}

module "ecs" {
  source = "./modules/ecs"

  prefix                = var.prefix
  region                = var.region
  cluster_name          = "${var.prefix}-cluster"
  task_cpu              = var.task_cpu
  task_memory           = var.task_memory
  desired_count         = var.desired_count
  ecr_image             = module.ecr.repository_url
  app_port              = var.app_port
  subnets               = module.vpc.public_subnets
  svc_sg_id             = module.sg.svc_sg_id
  target_group_arn      = module.alb.target_group_arn
  execution_role_arn    = module.iam.execution_role_arn
  task_role_arn         = module.iam.task_role_arn
  db_host               = module.rds.db_address
  db_username           = var.db_username
  db_name               = var.db_name
  db_password_param_arn = module.ssm.db_password_param_arn

  depends_on = [module.alb]
}

output "alb_dns" { value = module.alb.dns_name }
output "rds_endpoint" { value = module.rds.db_address }
output "ecs_cluster" { value = module.ecs.cluster_id }
output "task_definition_arn" { value = module.ecs.task_definition_arn }
output "ecr_repository_url" { value = module.ecr.repository_url }