terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

resource "aws_ecs_cluster" "this" {
  name = var.cluster_name
}

resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/${var.prefix}-app"
  retention_in_days = 14
}

resource "aws_ecs_task_definition" "task" {
  family                   = "${var.prefix}-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  execution_role_arn       = var.execution_role_arn
  task_role_arn            = var.task_role_arn

  container_definitions = jsonencode([
    {
      name      = "app",
      image     = var.ecr_image,
      essential = true,
      portMappings = [
        { containerPort = var.app_port, hostPort = var.app_port, protocol = "tcp" }
      ],
      environment = [
        { name = "PORT", value = tostring(var.app_port) },
        { name = "DATABASE_HOST", value = var.db_host },
        { name = "DATABASE_USER", value = var.db_username },
        { name = "DATABASE_NAME", value = var.db_name },
        { name = "DATABASE_SSL", value = "true" },
        { name = "PGSSLMODE", value = var.pg_sslmode }
      ],
      secrets = [
        {
          name      = "DATABASE_PASSWORD",
          valueFrom = var.db_password_param_arn
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-group         = "/ecs/promozone",
          awslogs-region        = "eu-west-1",
          awslogs-stream-prefix = "ecs",
          awslogs-multiline-pattern = "^\\d{4}-\\d{2}-\\d{2}T"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "svc" {
  name            = "${var.prefix}-svc"
  cluster         = aws_ecs_cluster.this.id
  task_definition = aws_ecs_task_definition.task.arn
  desired_count   = var.desired_count
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = var.subnets
    security_groups  = [var.svc_sg_id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "app"
    container_port   = var.app_port
  }
}

output "cluster_id" { value = aws_ecs_cluster.this.id }
output "task_definition_arn" { value = aws_ecs_task_definition.task.arn }