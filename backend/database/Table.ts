import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Table, TableRepository } from "dynamodb-toolbox";

const dynamoDBClient = new DynamoDBClient();

export const documentClient = DynamoDBDocumentClient.from(
  process.env.NODE_ENV !== "test"
    ? dynamoDBClient
    : new DynamoDBClient({
        endpoint: process.env.LOCAL_DYNAMO_ADDRESS,
        credentials: { accessKeyId: "fake", secretAccessKey: "fake" },
        region: "eu-west-2",
      })
);

export const taskTable = new Table({
  documentClient,
  name: "Tasks",
  partitionKey: { name: "pk", type: "string" },
  sortKey: { name: "sk", type: "string" },
});

export const taskTableRepository = taskTable.build(TableRepository);
