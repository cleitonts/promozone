terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

resource "aws_db_subnet_group" "this" {
  name       = "${var.prefix}-db-subnets"
  subnet_ids = var.private_subnets
}

resource "aws_db_instance" "postgres" {
  identifier              = "${var.prefix}-postgres"
  engine                  = "postgres"
  engine_version          = "15"
  instance_class          = var.db_instance_class
  allocated_storage       = var.db_allocated_storage
  storage_type            = "gp2"
  username                = var.db_username
  password                = var.db_password_value
  db_name                 = var.db_name
  skip_final_snapshot     = true
  publicly_accessible     = false
  vpc_security_group_ids  = [var.db_sg_id]
  db_subnet_group_name    = aws_db_subnet_group.this.name
  backup_retention_period = var.db_backup_retention_days
  deletion_protection     = false
}

output "db_address" { value = aws_db_instance.postgres.address }