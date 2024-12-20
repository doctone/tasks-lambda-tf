import type { APIGatewayEvent } from "aws-lambda";
import { post } from "../ddClient";
import middy from "@middy/core";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Logger } from "@aws-lambda-powertools/logger";

const logger = new Logger({ serviceName: "createTaskHandler" });

export const createHandler = async (event: APIGatewayEvent) => {
  const createResult = await post();
  if (createResult.isErr()) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating task",
        error: createResult.error,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "Successfully created task",
      data: createResult.value,
    }),
  };
};
export const handler = middy(createHandler).use(injectLambdaContext(logger));
