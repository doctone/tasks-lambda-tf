variable "name" {
  description = "The name of the DynamoDB table."
  type        = string
}

variable "billing_mode" {
  description = "Billing mode for the DynamoDB table."
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "hash_key" {
  description = "The hash key (partition key) for the table."
  type        = string
}

variable "range_key" {
  description = "The range key (sort key) for the table."
  type        = string
  default     = null
}

variable "attributes" {
  description = "A list of attributes for the table."
  type = list(object({
    name = string
    type = string
  }))
}

variable "tags" {
  description = "A map of tags to assign to the table."
  type        = map(string)
  default     = {}
}
