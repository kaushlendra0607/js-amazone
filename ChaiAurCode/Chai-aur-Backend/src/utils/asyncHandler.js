// we're creating an async wrapper so that we can use it in multiple files
const asyncHandler = (requestHandler)=>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next))//do gpt for more for this code
        .catch((err)=>next(err));
    }
}

export {asyncHandler}

/*this using try catch
const asyncHandler = (func)=> async(req,res,next)=>{
    try {
        await func(req,res,next);
    } catch (error) {
        res.status(error.code || 500).json({
            success:false,
            message:error.message,
        })
    }
}
*/