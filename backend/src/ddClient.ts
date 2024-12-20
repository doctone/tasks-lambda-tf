import { ResultAsync } from "neverthrow";
import { taskTableRepository } from "../database/Table";
import { PutItemCommand } from "dynamodb-toolbox";
import { TaskEntity } from "../database/Task";

export const scan = async () => {
  const scanPromise = taskTableRepository.scan();
  return ResultAsync.fromPromise(
    scanPromise,
    () => new Error("Failed to scan table")
  );
};

export const post = async () => {
  const createPromise = TaskEntity.build(PutItemCommand)
    .item({
      pk: "my first ever task",
      sk: "User#SamJ",
    })
    .send();

  return ResultAsync.fromPromise(
    createPromise,
    () => new Error("Failed to scan table")
  );
};
