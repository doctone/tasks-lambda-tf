variable "aws_profile" {
  default = "sam-learning-general"
  type    = string
}

variable "aws_region" {
  default = "us-east-1"
  type    = string
}

variable "bucket_name" {
  default = "www-task-manager-com"
  type    = string
}

variable "created_by" {
  default = "doctonedev"
  type    = string
}

variable "object_ownership" {
  default = "BucketOwnerPreferred"
  type    = string
}
