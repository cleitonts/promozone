terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

data "aws_iam_policy_document" "ecs_assume" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "exec" {
  name_prefix        = "${var.prefix}-ecs-exec-"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}

resource "aws_iam_role_policy" "exec_policy" {
  name = "${var.prefix}-ecs-exec-policy"
  role = aws_iam_role.exec.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchGetImage",
          "ecr:GetDownloadUrlForLayer"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents",
          "logs:CreateLogGroup"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "ssm:GetParameters",
          "kms:Decrypt"
        ],
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_role" "task" {
  name_prefix        = "${var.prefix}-ecs-task-"
  assume_role_policy = data.aws_iam_policy_document.ecs_assume.json
}

output "execution_role_arn" { value = aws_iam_role.exec.arn }
output "task_role_arn" { value = aws_iam_role.task.arn }