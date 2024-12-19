output "invoke_url" {
  description = "The URL to invoke the Lambda function."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}
