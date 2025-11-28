terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name               = "${var.prefix}-vpc"
  cidr               = var.vpc_cidr
  azs                = var.availability_zones
  public_subnets     = var.public_subnets
  private_subnets    = var.private_subnets
  enable_dns_hostnames = true
  enable_dns_support   = true
  enable_nat_gateway   = true
  single_nat_gateway   = true
  create_igw           = true
  tags = { Name = "${var.prefix}-vpc" }
}