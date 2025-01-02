import { post } from "../ddClient";
import middy from "@middy/core";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Logger } from "@aws-lambda-powertools/logger";
import { parser } from "@aws-lambda-powertools/parser/middleware";
import { taskSchema, type Task } from "../schemas/task";
import type { Context } from "aws-lambda";
import {
  ApiGatewayEnvelope,
  ApiGatewayV2Envelope,
} from "@aws-lambda-powertools/parser/envelopes";
import { TaskEntity } from "../../database/Task";
import { PutItemCommand } from "dynamodb-toolbox";

const logger = new Logger({ serviceName: "createTaskHandler" });

const createHandler = async (event: { data: Task }, _context: Context) => {
  console.log({ event });
  logger.info(`message body received: ${event}`);

  const createResult = await post(event.data);

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
export const handler = middy(createHandler)
  .use(injectLambdaContext(logger))
  .use(
    parser({
      schema: taskSchema,
      safeParse: true,
      envelope: ApiGatewayEnvelope,
    })
  );
