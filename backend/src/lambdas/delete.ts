import middy from "@middy/core";
import type { Context } from "vm";
import { deleteTask } from "../ddClient";

const deleteHandler = async (event) => {
  const deleteResult = await deleteTask({ pk: event.pk, sk: event.sk })

  if (deleteResult.isErr()) {
    return {
      statusCode: 500,
      message: 'Failed to delete'
    }
  }

  return {
    statusCode: 201,
    message: "Task deleted"
  }
}

export const handler = middy(deleteHandler)
