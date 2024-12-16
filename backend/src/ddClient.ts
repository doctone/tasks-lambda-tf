import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();
export const scan = async ({TableName}:{TableName:string}) => {
  return dynamo
    .scan({
      TableName,
    })
    .promise();
};
