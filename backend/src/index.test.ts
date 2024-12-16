import { handler } from ".";
import * as ddClient from "./ddClient";
import { when } from "vitest-when";

describe("lambda", () => {
  it("should return 200", async () => {
    process.env.TABLE_NAME = "test";
    const ddSpy = vi.spyOn(ddClient, "scan");
    const mockItems = [{ id: "1", name: "Test Item" }];

    when(ddSpy)
      .calledWith({
        TableName: process.env.TABLE_NAME,
      })
      .thenResolve({
        Items: mockItems,
      } as never);

    const result = await handler({});

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Successfully read from DynamoDB",
      data: mockItems,
    });
  });
});
