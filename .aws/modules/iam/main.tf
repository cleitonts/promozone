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

locals {
  github_sub     = "repo:${var.github_org}/${var.github_repo}:ref:${var.github_ref}"
  oidc_provider  = var.github_oidc_provider_arn
}

data "aws_iam_policy_document" "github_assume" {
  statement {
    effect = "Allow"
    principals {
      type        = "Federated"
      identifiers = [local.oidc_provider]
    }
    actions = ["sts:AssumeRoleWithWebIdentity"]
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:sub"
      values   = [local.github_sub]
    }
    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "github_backend_deploy" {
  name               = var.github_deploy_role_name
  assume_role_policy = data.aws_iam_policy_document.github_assume.json
}

resource "aws_iam_role_policy" "github_backend_deploy_policy" {
  name = "${var.prefix}-github-backend-deploy-policy"
  role = aws_iam_role.github_backend_deploy.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:CompleteLayerUpload",
          "ecr:InitiateLayerUpload",
          "ecr:PutImage",
          "ecr:UploadLayerPart",
          "ecr:DescribeRepositories"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "ecs:UpdateService",
          "ecs:DescribeServices",
          "ecs:DescribeTaskDefinition",
          "ecs:RegisterTaskDefinition"
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
          "ssm:GetParameter",
          "ssm:GetParameters",
          "kms:Decrypt"
        ],
        Resource = "*"
      }
    ]
  })
}

output "github_deploy_role_arn" { value = aws_iam_role.github_backend_deploy.arn }

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