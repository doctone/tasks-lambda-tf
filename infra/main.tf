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
  zip_key        = "upsert.zip"
  table_name     = module.tasks_table.table_name
  source_dir     = "${path.module}/../backend/dist/upsert"
  output_path    = "${path.module}/../../upsert.zip"

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

resource "aws_s3_bucket" "deployment_bucket" {
  bucket = var.bucket_name
  tags = {
    Name       = var.bucket_name
    Created_By = var.created_by
  }

}

resource "aws_s3_bucket_ownership_controls" "ownership_controls" {
  bucket = aws_s3_bucket.deployment_bucket.id
  rule {
    object_ownership = var.object_ownership
  }
}


resource "aws_s3_bucket_acl" "s3_bucket_acl" {
  depends_on = [aws_s3_bucket_ownership_controls.ownership_controls]
  bucket     = aws_s3_bucket.deployment_bucket.id
  acl        = "private"
}

resource "aws_cloudfront_origin_access_control" "cloudfront_oac" {
  name                              = "My_Cloudfront-OAC"
  description                       = "The origin access control configuration for the Cloudfront distribution"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}
#
resource "aws_cloudfront_distribution" "website_cdn" {
  enabled = true

  origin {
    domain_name              = aws_s3_bucket.deployment_bucket.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.cloudfront_oac.id
    origin_id                = "origin-bucket-${aws_s3_bucket.deployment_bucket.id}"
  }

  default_root_object = "index.html"

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "DELETE", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    min_ttl                = "0"
    default_ttl            = "300"
    max_ttl                = "1200"
    target_origin_id       = "origin-bucket-${aws_s3_bucket.deployment_bucket.id}"
    viewer_protocol_policy = "redirect-to-https"
    compress               = true

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  custom_error_response {
    error_caching_min_ttl = 300
    error_code            = 404
    response_code         = "200"
    response_page_path    = "/404.html"
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }

  tags = {
    Created_By = var.created_by
  }
}
resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.deployment_bucket.id
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "AllowCloudFrontServicePrincipalReadOnly",
        "Effect" : "Allow",
        "Principal" : {
          "Service" : "cloudfront.amazonaws.com"
        },
        "Action" : "s3:GetObject",
        "Resource" : "${aws_s3_bucket.deployment_bucket.arn}/*",
        "Condition" : {
          "StringEquals" : {
            "AWS:SourceArn" : "${aws_cloudfront_distribution.website_cdn.arn}"
          }
        }
      }
    ]
  })
}
