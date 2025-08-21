//Here we're creating a custom error handler 
//in case of try catch async handler we dont nedd costum error handlers but by doing this we can use error handler wherever needed meaning it increases extensibility bcz using try catch will still be a async handler not an error handler
// do gpt for more
class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        // this.message = message --super(message) will do the same thing
        this.success = false
        this.errors = errors;

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor);
        }
    }
}

export {ApiError}