import { Entity, number, schema, string } from "dynamodb-toolbox";
import { taskTable } from "./Table";

const taskSchema = schema({
  pk: string().key(),
  sk: string().key(),
  status: number().default(1),
});

export const TaskEntity = new Entity({
  name: "Task",
  table: taskTable,
  schema: taskSchema,
});
