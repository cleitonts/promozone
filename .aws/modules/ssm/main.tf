terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

data "aws_ssm_parameter" "db_password" {
  count           = var.create_db_password_param ? 0 : 1
  name            = var.db_password_param_name
  with_decryption = true
}

resource "aws_ssm_parameter" "db_password" {
  count       = var.create_db_password_param ? 1 : 0
  name        = var.db_password_param_name
  type        = "SecureString"
  value       = var.db_password_param_value
  overwrite   = true
}

output "db_password_value" {
  value     = var.create_db_password_param ? aws_ssm_parameter.db_password[0].value : data.aws_ssm_parameter.db_password[0].value
  sensitive = true
}
output "db_password_param_arn" {
  value = var.create_db_password_param ? aws_ssm_parameter.db_password[0].arn : data.aws_ssm_parameter.db_password[0].arn
}