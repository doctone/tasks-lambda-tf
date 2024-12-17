import type { APIGatewayEvent } from "aws-lambda";
import { handler } from ".";
import { taskTableRepository } from "../database/Table";

vi.mock("../database/Table");

describe("lambda", () => {
  it("should return 200", async () => {
    const result = await handler({
      body: "this is an event",
    } as APIGatewayEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Successfully read from DynamoDB",
      data: [
        { id: 1, name: "task1" },
        { id: 2, name: "task2" },
      ],
    });
  });
});
