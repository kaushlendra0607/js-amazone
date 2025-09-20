//now this is custom response handler 
//do gpt for more

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode <400
    }
}

export {ApiResponse}