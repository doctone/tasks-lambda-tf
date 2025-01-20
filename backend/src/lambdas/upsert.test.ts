import { handler, upsertHandler } from "./upsert";
import type { Context } from "aws-lambda";
import type { APIGatewayProxyEvent } from "@aws-lambda-powertools/parser/types";
import * as ddClient from "../ddClient";

describe("upsert", () => {
  it("creates a task record", async () => {
    const body = { pk: "wash dishes", sk: "me", status: "not started" };
    const apiGatewayEvent: APIGatewayProxyEvent = {
      body: JSON.stringify(body),
      headers: {},
      httpMethod: "POST" as const,
      isBase64Encoded: false,
      multiValueHeaders: {},
      multiValueQueryStringParameters: {},
      path: "/tasks",
      pathParameters: {},
      queryStringParameters: {},
      requestContext: {} as any,
      resource: "",
      stageVariables: {},
    };
    vi.spyOn(ddClient, "put").mockResolvedValueOnce({
      isErr: () => false,
      value: {},
      isOk: () => true,
    } as never);
    const result = await upsertHandler(body, {} as Context);
    expect(result.statusCode).toBe(201);
  });
});
