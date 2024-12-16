import { scan } from "./ddClient";

export const handler = async (event) => {
  const tableName = process.env.TABLE_NAME;
  if (!tableName)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error reading from DynamoDB",
        error: "Table name not defined",
      }),
    };

  try {
    const params = {
      TableName: tableName,
    };

    const data = await scan(params);

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
        error: JSON.stringify(error),
      }),
    };
  }
};
