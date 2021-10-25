import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Todo from "../beans/Todo";
import createDynamoDbClient from "../config/db";

class TodoService {
  constructor(private docClient: DocumentClient, private tableName: string) {}

  async getAllTodos(): Promise<Todo[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Todo[];
  }

  async getTodo(todoId: string): Promise<Todo> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { todoId },
      })
      .promise();
    return result.Item as Todo;
  }

  async createTodo(todo: Todo): Promise<Todo> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: todo,
      })
      .promise();
    return todo;
  }

  async updateTodo(todoId: string, partialTodo: Partial<Todo>): Promise<Todo> {
    const result = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { todoId },
        UpdateExpression:
          "set #title = :title, #description = :description",
        ExpressionAttributeNames: {
          "#title": "title",
          "#description": "description"
        },
        ExpressionAttributeValues: {
          ":title": partialTodo.title,
          ":description": partialTodo.description
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return result.Attributes as Todo;
  }

  async deleteTodo(todoId: string) {
    return this.docClient
      .delete({
        TableName: this.tableName,
        Key: { todoId },
      })
      .promise();
  }
}

const todoService = new TodoService(
  createDynamoDbClient(),
  process.env.TODOS_TABLE
);

export default todoService;