import { scan } from "./ddClient";
import type { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  const res = await scan();

  const data = res.map((items) => items);

  if (data.isErr()) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error reading from DynamoDB",
        error: data.error,
      }),
    };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Successfully read from DynamoDB",
      data: data.value.Items,
    }),
  };
};
