terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

resource "aws_ecr_repository" "app" {
  name                 = "${var.prefix}-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

output "repository_url" { value = aws_ecr_repository.app.repository_url }