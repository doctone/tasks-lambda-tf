import { scan } from "../ddClient";
import type { APIGatewayEvent } from "aws-lambda";
import { Logger } from "@aws-lambda-powertools/logger";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import middy from "@middy/core";

const logger = new Logger({ serviceName: "scanTasksHandler" });

export const lambdaHandler = async (event: APIGatewayEvent) => {
  const res = await scan();
  logger.info("Scan result", { res });
  if (res.isErr()) {
    logger.error("Error reading from DynamoDB", { error: res.error });
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error reading from DynamoDB",
        error: res.error,
      }),
    };
  }
  const data = res.value.Items?.map((items) => items) ?? [];

  logger.info("Successfully read from DynamoDB", { data });

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: "Successfully read from DynamoDB",
      data,
    }),
  };
};

export const handler = middy(lambdaHandler).use(injectLambdaContext(logger));
