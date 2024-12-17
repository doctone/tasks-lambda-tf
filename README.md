# tasks-lambda-tf

This task manager app is built using a serverless archiecture with AWS lamda, Dynamo DB for storage, and terraform for IaC

# Tools

- `dynamodb-toolbox` for database modelling ( and testing )
- `neverthrow` for handling response types and error states
- `aws-powertools` and `middy` for enhanced logging and lambda middleware
- `esbuild` for bundling
- `vitest` as the testing framework
