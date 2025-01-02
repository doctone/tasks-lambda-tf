import { put } from "../ddClient";
import middy from "@middy/core";
import { injectLambdaContext } from "@aws-lambda-powertools/logger/middleware";
import { Logger } from "@aws-lambda-powertools/logger";
import { parser } from "@aws-lambda-powertools/parser/middleware";
import { taskSchema, type Task } from "../schemas/task";
import type { Context } from "aws-lambda";
import { ApiGatewayEnvelope } from "@aws-lambda-powertools/parser/envelopes";

const logger = new Logger({ serviceName: "createTaskHandler" });

export const upsertHandler = async (event: Task, _context: Context) => {
  console.log({ event });
  logger.info(`message body received: ${event}`);

  const putResult = await put(event);

  if (putResult.isErr()) {
    putResult.mapErr((error) => {
      console.log("mapped error", error);
    });
    console.log("failing", putResult);

    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error creating task",
        error: putResult.error,
      }),
    };
  }
  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Successfully created task",
      data: putResult.value,
    }),
  };
};

export const handler = middy(upsertHandler)
  .use(injectLambdaContext(logger))
  .use(
    parser({
      schema: taskSchema,
      envelope: ApiGatewayEnvelope,
    })
  );
