resource "aws_iam_role" "this" {
  name = var.exec_role_name

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

resource "aws_iam_role_policy" "lambda_dynamodb_policy" {
  name = "lambda_dynamodb_policy"
  role = aws_iam_role.this.id

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
        Resource = var.table_arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.this.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_cloudwatch_log_group" "hello_world" {
  name = "/aws/lambda/${aws_lambda_function.this.function_name}"

  retention_in_days = 30
}

data "archive_file" "this" {
  type = "zip"

  source_dir  = "${path.module}/../../../backend/dist"
  output_path = "${path.module}/../../lambda-function.zip"

}

resource "aws_s3_object" "this" {
  bucket = var.bucket_name

  key    = var.zip_key
  source = data.archive_file.this.output_path

  etag = filemd5(data.archive_file.this.output_path)
}

resource "aws_lambda_function" "this" {
  function_name = var.function_name
  role          = aws_iam_role.this.arn


  #   s3_bucket = module.lambda_s3_bucket.bucket_name
  #   s3_key    = aws_s3_object.lambda_hello_world.key
  s3_bucket = var.s3_bucket_name
  s3_key    = aws_s3_object.this.key

  runtime = "nodejs20.x"
  #   handler = "index.handler"
  handler = var.handler

  #   source_code_hash = data.archive_file.lambda_hello_world.output_base64sha256
  source_code_hash = filebase64sha256(data.archive_file.this.output_path)

  environment {
    variables = {
      #   TABLE_NAME = module.tasks_table.table_name
      TABLE_NAME = var.table_name
    }
  }
}
