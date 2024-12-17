import AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ok, err, ResultAsync } from "neverthrow";

const dynamo = new AWS.DynamoDB.DocumentClient();

export const scan = ({
  TableName,
}: {
  TableName: string;
}): ResultAsync<DocumentClient.ScanOutput, Error> => {
  return ResultAsync.fromPromise(
    dynamo
      .scan({
        TableName,
      })
      .promise(),
    () => new Error("Failed to scan table")
  );
};
