const formatJsonResponse = (statusCode: number, response: any):any =>{
    return {
        statusCode,
        body: JSON.stringify(response)
    }
}

export default formatJsonResponse;