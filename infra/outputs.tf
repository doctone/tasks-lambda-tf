output "invoke_url" {
  description = "The URL to invoke the Lambda function."

  value = aws_apigatewayv2_stage.tasks.invoke_url
}
