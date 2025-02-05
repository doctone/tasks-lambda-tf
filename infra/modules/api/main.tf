variable "create_options_route" {
  description = "Whether to create an OPTIONS route for CORS preflight requests"
  type        = bool
  default     = false
}

resource "aws_apigatewayv2_integration" "this" {
  api_id = var.api_id

  integration_uri    = var.lambda_invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "this" {
  api_id = var.api_id

  route_key = var.route_key
  target    = "integrations/${aws_apigatewayv2_integration.this.id}"
}

resource "aws_apigatewayv2_route" "options" {
  count     = var.create_options_route ? 1 : 0
  api_id    = var.api_id
  route_key = "OPTIONS ${split(" ", var.route_key)[1]}"
  target    = "integrations/${aws_apigatewayv2_integration.this.id}"
}


resource "aws_lambda_permission" "this" {
  statement_id  = "AllowExecutionFromAPIGateway-${var.lambda_function_name}"
  action        = "lambda:InvokeFunction"
  function_name = var.lambda_function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${var.api_execution_arn}/*/*"
}

resource "aws_apigatewayv2_api" "this" {
  name          = var.api_id
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["*"]
    allow_methods = ["PUT", "OPTIONS"]
    allow_headers = ["Content-Type", "Authorization"]
    max_age       = 300
  }
}
