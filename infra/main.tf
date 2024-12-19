provider "aws" {
  region = "us-east-1"
}

module "lambda_s3_bucket" {
  source        = "./modules/storage"
  bucket_prefix = "tasks-lambda"
}
module "tasks_table" {
  source       = "./modules/data"
  name         = "Tasks"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "pk"
  range_key    = "sk"

  attributes = [
    { name = "pk", type = "S" },
    { name = "sk", type = "S" }
  ]

  tags = {
    Environment = "dev"
    Project     = "task-manager"
  }
}

module "scan" {
  source         = "./modules/lambda"
  function_name  = "Scan"
  handler        = "index.handler"
  exec_role_name = "scan-exec-role"
  bucket_name    = module.lambda_s3_bucket.bucket_name
  zip_key        = "index.zip"
  s3_bucket_name = module.lambda_s3_bucket.bucket_name
  table_name     = module.tasks_table.table_name
  table_arn      = module.tasks_table.table_arn
}


resource "aws_apigatewayv2_api" "lambda" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_stage" "lambda" {
  api_id = aws_apigatewayv2_api.lambda.id

  name        = "serverless_lambda_stage"
  auto_deploy = true

  access_log_settings {
    destination_arn = aws_cloudwatch_log_group.api_gw.arn

    format = jsonencode({
      requestId               = "$context.requestId"
      sourceIp                = "$context.identity.sourceIp"
      requestTime             = "$context.requestTime"
      protocol                = "$context.protocol"
      httpMethod              = "$context.httpMethod"
      resourcePath            = "$context.resourcePath"
      routeKey                = "$context.routeKey"
      status                  = "$context.status"
      responseLength          = "$context.responseLength"
      integrationErrorMessage = "$context.integrationErrorMessage"
      }
    )
  }
}

module "scan_route" {
  source               = "./modules/api"
  api_id               = aws_apigatewayv2_api.lambda.id
  api_execution_arn    = aws_apigatewayv2_api.lambda.execution_arn
  lambda_invoke_arn    = module.scan.invoke_arn
  lambda_function_name = module.scan.function_name
  route_key            = "GET /scan"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}
