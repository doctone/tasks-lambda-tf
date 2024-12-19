output "function_name" {
  description = "The name of the Lambda function."
  value       = aws_lambda_function.this.function_name
}

output "invoke_arn" {
  description = "The ARN of the Lambda function."
  value       = aws_lambda_function.this.invoke_arn
}

output "role" {
  description = "The ARN of the Lambda execution role."
  value       = aws_iam_role.this.id
}
