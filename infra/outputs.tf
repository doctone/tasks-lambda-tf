output "invoke_url" {
  description = "The URL to invoke the Lambda function."

  value = aws_apigatewayv2_stage.tasks.invoke_url
}

output "cloudfront_domain_name" {
  description = "The domain name of the CloudFront distribution."

  value = aws_cloudfront_distribution.website_cdn.domain_name
}
