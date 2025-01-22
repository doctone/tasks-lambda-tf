import middy from "@middy/core";
import { deleteTask } from "../ddClient";
import type { APIGatewayEvent } from "aws-lambda";
import { z } from "zod";
import { parser } from "@aws-lambda-powertools/parser/middleware";

const eventSchema = z.object({
  pk: z.string(),
  sk: z.string(),
});

const deleteHandler = async (event: z.infer<typeof eventSchema>) => {
  const deleteResult = await deleteTask({ pk: event.pk, sk: event.sk });

  if (deleteResult.isErr()) {
    return {
      statusCode: 500,
      message: "Failed to delete",
    };
  }

  return {
    statusCode: 201,
    message: "Task deleted",
  };
};

export const handler = middy(deleteHandler).use(
  parser({ schema: eventSchema })
);
