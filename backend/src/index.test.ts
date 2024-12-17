import type { APIGatewayEvent } from "aws-lambda";
import { handler, lambdaHandler } from ".";
import { setMockItems } from "../database/__mocks__/Table";

vi.mock("../database/Table");

describe("lambda", () => {
  it("should return 200", async () => {
    const mockItems = [
      { id: 1, name: "task1" },
      { id: 2, name: "task2" },
    ];
    setMockItems({ items: mockItems });
    const result = await lambdaHandler({
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
