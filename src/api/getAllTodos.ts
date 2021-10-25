import { APIGatewayEvent, Handler, APIGatewayProxyResult } from "aws-lambda";
import middify from "../core/middy";
import formatJsonResponse from "../core/formatJsonResponse";
import todoService from "../services/todoService";
export const handler: Handler = middify(
  async (
    event: APIGatewayEvent
  ): Promise<APIGatewayProxyResult> => {
    try {
      const todos = await todoService.getAllTodos();

      return formatJsonResponse(200, todos);
    } catch (err) {
      return formatJsonResponse(500, err);
    }
  }
);
