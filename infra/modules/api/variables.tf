variable "api_id" {
  description = "The ID of the API Gateway."
  type        = string
}

variable "lambda_invoke_arn" {
  description = "The ARN of the Lambda function."
  type        = string
}

variable "route_key" {
  description = "The route key for the API Gateway route."
  type        = string
}

variable "api_execution_arn" {
  description = "The ARN of the API Gateway execution role."
  type        = string
}

variable "lambda_function_name" {
  description = "The name of the API Gateway route."
  type        = string
}




