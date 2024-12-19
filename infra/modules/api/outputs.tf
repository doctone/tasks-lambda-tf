output "route_id" {
  description = "The ID of the created route"
  value       = aws_apigatewayv2_route.this.id
}

output "integration_id" {
  description = "The ID of the integration"
  value       = aws_apigatewayv2_integration.this.id
}
