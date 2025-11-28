terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

resource "aws_security_group" "alb" {
  name        = "${var.prefix}-alb-sg"
  description = "ALB security group"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTP"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group" "svc" {
  name   = "${var.prefix}-svc-sg"
  vpc_id = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "svc_from_alb" {
  type                     = "ingress"
  from_port                = var.app_port
  to_port                  = var.app_port
  protocol                 = "tcp"
  security_group_id        = aws_security_group.svc.id
  source_security_group_id = aws_security_group.alb.id
  description              = "Allow ALB"
}

resource "aws_security_group" "db" {
  name   = "${var.prefix}-db-sg"
  vpc_id = var.vpc_id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_security_group_rule" "db_from_svc" {
  type                     = "ingress"
  from_port                = var.db_port
  to_port                  = var.db_port
  protocol                 = "tcp"
  security_group_id        = aws_security_group.db.id
  source_security_group_id = aws_security_group.svc.id
  description              = "Allow DB from service"
}

output "alb_sg_id" { value = aws_security_group.alb.id }
output "svc_sg_id" { value = aws_security_group.svc.id }
output "db_sg_id"  { value = aws_security_group.db.id }