# tasks-lambda-tf

This task manager app is built using a serverless archiecture with AWS lamda, Dynamo DB for storage, and terraform for IaC

# Tools

## Backend

- `dynamodb-toolbox` for database modelling ( and testing )
- `neverthrow` for handling response types and error states
- `aws-powertools` and `middy` for enhanced logging and lambda middleware
- `esbuild` for bundling
- `vitest` as the testing framework

## Frontend

- `React` with [Vite](vite.dev)
- [Tailwind](tailwindui.com)

## Setup

`npm install`
`turbo run build`

## Local

Currently the infrastructure is configured for AWS and there is no local alternative

To apply the infrastructure, simply apply the terraform configuration from within the `infra` directory

In order to send the built assets to s3 in order for cloudfront to serve them run:
`turbo deploy`

The app sill now be accessible from the cloudfront domain name, displayed in the terraform output.
