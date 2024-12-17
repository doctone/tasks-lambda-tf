import { ResultAsync } from "neverthrow";
import { taskTableRepository } from "../database/Table";

export const scan = () => {
  const tablePromise = taskTableRepository.scan();

  return ResultAsync.fromPromise(
    tablePromise,
    () => new Error("Failed to scan table")
  );
};
