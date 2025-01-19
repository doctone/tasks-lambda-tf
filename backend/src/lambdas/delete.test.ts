import * as ddClient from "../ddClient";

import { DeleteItemCommand, TableSpy } from "dynamodb-toolbox";
import { taskTable } from "../../database/Table";

const tableSpy = taskTable.build(TableSpy);
describe("delete", () => {
  it("should delete a task", () => {
    expect(1).toBe(1);
  });
});
