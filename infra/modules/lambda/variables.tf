variable "table_name" {
  description = "The name of the DynamoDB table."
  type        = string
}

variable "function_name" {
  description = "The name of the Lambda."
  type        = string
}

variable "handler" {
  description = "The handler for the Lambda."
  type        = string
}

variable "exec_role_name" {
  description = "The name of the execution role."
  type        = string
}

variable "bucket_name" {
  description = "The name of the S3 bucket."
  type        = string
}

variable "zip_key" {
  description = "The key of the S3 bucket."
  type        = string
}

variable "policy" {
  description = "The policy for the Lambda."
  type = object({
    Version = string
    Statement = list(object({
      Effect   = string
      Action   = list(string)
      Resource = string
    }))
  })
}

variable "output_path" {
  description = "The path to the output."
  type        = string
}

variable "source_dir" {
  description = "The source directory."
  type        = string
}
