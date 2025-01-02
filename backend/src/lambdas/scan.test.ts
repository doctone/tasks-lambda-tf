import type { APIGatewayEvent } from "aws-lambda";
import { lambdaHandler } from "./scan";
import { TableSpy } from "dynamodb-toolbox/table/actions/spy";
import { taskTable } from "../../database/Table";
import { ScanCommand } from "dynamodb-toolbox";

const tableSpy = taskTable.build(TableSpy);

describe("lambda", () => {
  it("should return 200", async () => {
    const mockItems = [
      { id: 1, name: "task1" },
      { id: 2, name: "task2" },
    ];

    tableSpy.on(ScanCommand).resolve({ Items: mockItems });
    const result = await lambdaHandler({
      body: "this is an event",
    } as APIGatewayEvent);
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({
      message: "Successfully read from DynamoDB",
      data: mockItems,
    });
  })
  it('should return 500 if the scan fails', async () => {
    tableSpy.on(ScanCommand).reject(new Error('fail'))
    const result = await lambdaHandler({
      body: "this is an event",
    } as APIGatewayEvent);

    expect(result.statusCode).toBe(500)

  });
});
