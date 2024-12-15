import AWS from 'aws-sdk'

const dynamo = new AWS.DynamoDB.DocumentClient()


export const handler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  if (!tableName)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error reading from DynamoDB",
        error: "Table name not defined",
      }),
    }; // Table name from environment variables

  try {
    const params = {
      TableName: tableName,
    };

    const data = await dynamo.scan(params).promise();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Successfully read from DynamoDB",
        data: data.Items,
      }),
    };
  } catch (error) {
    console.error("Error reading from DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error reading from DynamoDB",
        error: error.message,
      }),
    };
  }
}
