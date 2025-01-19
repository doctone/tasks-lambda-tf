import { ResultAsync } from "neverthrow";
import { taskTableRepository } from "../database/Table";
import { DeleteItemCommand, PutItemCommand } from "dynamodb-toolbox";
import { TaskEntity } from "../database/Task";

export const scan = async () => {
  const scanPromise = taskTableRepository.scan();
  return ResultAsync.fromPromise(
    scanPromise,
    () => new Error("Failed to scan table")
  );
};

export const put = async ({
  pk,
  sk,
  status,
}: {
  pk: string;
  sk: string;
  status: string;
}) => {
  const createPromise = TaskEntity.build(PutItemCommand)
    .item({
      pk,
      sk,
      status,
    })
    .send();

  return ResultAsync.fromPromise(
    createPromise,
    () => new Error("Failed to create task")
  );
};

export const deleteTask = async ({ pk, sk }: { pk: string, sk: string }) => {
  const deletePromise = TaskEntity.build(DeleteItemCommand).key({ pk, sk }).send()
  return ResultAsync.fromPromise(deletePromise, () => new Error("failed to delete item"))
}
