import { APIGatewayEvent, Handler, APIGatewayProxyResult } from "aws-lambda";
import middify from "../core/middy";
import formatJsonResponse from "../core/formatJsonResponse";

import todoService from "../services/todoService";

export const handler: Handler = middify(
  async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    const todoId: string = event.pathParameters.todoId;
    try {
        const todo = await todoService.deleteTodo(todoId)

        return formatJsonResponse(200,todo);
    } catch (err) {
      return formatJsonResponse(500, err);
    }
  }
);
