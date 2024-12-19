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

data "archive_file" "lambda_hello_world" {
  type = "zip"

  source_dir  = "${path.module}/../backend/dist"
  output_path = "${path.module}/lambda-function.zip"

}


resource "aws_s3_object" "lambda_hello_world" {
  bucket = module.lambda_s3_bucket.bucket_name

  key    = "index.zip"
  source = data.archive_file.lambda_hello_world.output_path

  etag = filemd5(data.archive_file.lambda_hello_world.output_path)
}

resource "aws_lambda_function" "hello_world" {
  function_name = "HelloWorld"
  role          = aws_iam_role.lambda_role.arn


  s3_bucket = module.lambda_s3_bucket.bucket_name
  s3_key    = aws_s3_object.lambda_hello_world.key

  runtime = "nodejs20.x"
  handler = "index.handler"

  source_code_hash = data.archive_file.lambda_hello_world.output_base64sha256
  environment {
    variables = {
      TABLE_NAME = module.tasks_table.table_name
    }
  }

}

resource "aws_cloudwatch_log_group" "hello_world" {
  name = "/aws/lambda/${aws_lambda_function.hello_world.function_name}"

  retention_in_days = 30
}

resource "aws_iam_role" "lambda_role" {
  name = "lambda_dynamodb_role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = "sts:AssumeRole",
        Effect = "Allow",
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "lambda_dynamodb_policy"
  role = aws_iam_role.lambda_role.id

  policy = jsonencode({
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
  })
}

resource "aws_iam_role" "lambda_exec" {
  name = "serverless_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Sid    = ""
      Principal = {
        Service = "lambda.amazonaws.com"
      }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_exec.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
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

module "hello_world_route" {
  source               = "./modules/api"
  api_id               = aws_apigatewayv2_api.lambda.id
  api_execution_arn    = aws_apigatewayv2_api.lambda.execution_arn
  lambda_invoke_arn    = aws_lambda_function.hello_world.invoke_arn
  lambda_function_name = aws_lambda_function.hello_world.function_name
  route_key            = "GET /hello"
}

resource "aws_cloudwatch_log_group" "api_gw" {
  name = "/aws/api_gw/${aws_apigatewayv2_api.lambda.name}"

  retention_in_days = 30
}
