import { APIGatewayEvent, Handler, APIGatewayProxyResult } from "aws-lambda";

import * as uuid from "uuid"
import middify from "../core/middy";
import formatJsonResponse from "../core/formatJsonResponse";
import todoService from "../services/todoService";

import createTodo from "../dtos/createTodoDto";

export const handler: Handler = middify(
    async(event: APIGatewayEvent & createTodo):Promise<APIGatewayProxyResult>=>{
        const {title,description} = event.body;
        console.log(title)
        try{
            const todoId: string = uuid.v4();
            const todo = await todoService.createTodo({
                todoId,
                title,
                description,
                active: true,
                createdAt: new Date().toISOString()
            })

            return formatJsonResponse(201,todo);
        }catch(err){
            return formatJsonResponse(500,err)
        }
    }
)