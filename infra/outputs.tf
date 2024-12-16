output "function_name" {
  description = "Name of the Lambda function."

  value = aws_lambda_function.hello_world.function_name
}

output "invoke_url" {
  description = "The URL to invoke the Lambda function."

  value = aws_apigatewayv2_stage.lambda.invoke_url
}
