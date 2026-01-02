variable "prefix" { 
  type    = string
  default = "promozone"
}

variable "location" { 
  type    = string
  default = "uksouth"
}

variable "sku_tier" { 
  type    = string
  default = "Basic"
}

variable "sku_size" { 
  type    = string
  default = "B1"
}

variable "free_tier" {
  type    = bool
  default = true
}