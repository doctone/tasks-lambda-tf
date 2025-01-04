provider "aws" {
  region = "us-east-1"
}
terraform {
  backend "s3" {
    bucket         = "task-manager-tf-state"
    key            = "tf-state"
    region         = "us-east-1"
    dynamodb_table = "terraform-state-lock" # Enables state locking
  }
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



resource "aws_apigatewayv2_api" "tasks" {
  name          = "serverless_lambda_gw"
  protocol_type = "HTTP"
  cors_configuration {
    allow_methods = ["GET", "PUT"]
    allow_origins = ["*"]
  }
}

resource "aws_apigatewayv2_stage" "tasks" {
  api_id = aws_apigatewayv2_api.tasks.id

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

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.tasks.name}"

  retention_in_days = 30
}

module "scan" {
  source         = "./modules/lambda"
  function_name  = "Scan"
  handler        = "index.handler"
  exec_role_name = "scan-exec-role"
  bucket_name    = module.lambda_s3_bucket.bucket_name
  zip_key        = "index.zip"
  table_name     = module.tasks_table.table_name
  source_dir     = "${path.module}/../backend/dist/scan"
  output_path    = "${path.module}/../../scan.zip"

  policy = {
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan"
        ],
        Effect   = "Allow",
        Resource = module.tasks_table.table_arn
      }
    ]
  }
}

module "scan_route" {
  source               = "./modules/api"
  api_id               = aws_apigatewayv2_api.tasks.id
  api_execution_arn    = aws_apigatewayv2_api.tasks.execution_arn
  lambda_invoke_arn    = module.scan.invoke_arn
  lambda_function_name = module.scan.function_name
  route_key            = "GET /scan"
}

module "create_lambda" {
  source         = "./modules/lambda"
  function_name  = "Create"
  handler        = "index.handler"
  exec_role_name = "create-exec-role"
  bucket_name    = module.lambda_s3_bucket.bucket_name
  zip_key        = "create.zip"
  table_name     = module.tasks_table.table_name
  source_dir     = "${path.module}/../backend/dist/create"
  output_path    = "${path.module}/../../create.zip"

  policy = {
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "dynamodb:GetItem",
          "dynamodb:Query",
          "dynamodb:Scan",
          "dynamodb:PutItem"
        ],
        Effect   = "Allow",
        Resource = module.tasks_table.table_arn
      }
    ]
  }
}

module "create_route" {
  source               = "./modules/api"
  api_id               = aws_apigatewayv2_api.tasks.id
  api_execution_arn    = aws_apigatewayv2_api.tasks.execution_arn
  lambda_invoke_arn    = module.create_lambda.invoke_arn
  lambda_function_name = module.create_lambda.function_name
  route_key            = "PUT /create"
}

