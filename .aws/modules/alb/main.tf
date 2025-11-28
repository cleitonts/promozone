terraform {
  required_providers {
    aws = { source = "hashicorp/aws" }
  }
}

resource "aws_lb" "this" {
  name               = "${var.prefix}-alb"
  load_balancer_type = "application"
  internal           = false
  subnets            = var.subnets
  security_groups    = [var.alb_sg_id]
  enable_deletion_protection = false
}

resource "aws_lb_target_group" "app" {
  name        = "${var.prefix}-tg"
  port        = var.app_port
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = var.vpc_id

  health_check {
    enabled             = true
    path                = var.health_path
    matcher             = "200-399"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 2
  }
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.this.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

output "dns_name" { value = aws_lb.this.dns_name }
output "target_group_arn" { value = aws_lb_target_group.app.arn }