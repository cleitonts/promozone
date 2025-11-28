variable "prefix" { type = string }

variable "github_deploy_role_name" {
  type    = string
  default = "github-backend-deploy"
}

variable "github_org" {
  type = string
}

variable "github_repo" {
  type = string
}

variable "github_ref" {
  type    = string
  default = "refs/heads/main"
}

variable "github_oidc_provider_arn" {
  type = string
}

variable "create_github_oidc_provider" {
  type    = bool
  default = false
}