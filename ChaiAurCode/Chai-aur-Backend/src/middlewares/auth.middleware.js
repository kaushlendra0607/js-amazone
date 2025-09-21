import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next)=>{
    try {
        //we're getting this accesToken from the cookie bcz in our controller while sending res
        //we actually set the name of this cookie accessToken
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");//do gpt for more on this header code
        //in case our frontend is some mobile app then there is concept of header not cookies, both are almost kind of same
        // console.log("cookie",req.cookies);
        // console.log("header",req.header);
        // console.log("token",token);
        
        if(!token){
            throw new ApiError(401,"Unauthorized request.");
        }
    
        const decodeToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        //  console.log("Decoded token:", decodeToken);
    
        const userDoc = await User.findById(decodeToken?._id).select("-password -refreshToken");
        //in the method we wrote to generate accesstoken we also gave it id
        //  console.log("User found in DB:", userDoc);
        if(!userDoc){
            throw new ApiError(401,"Invalid access token.");
        }
    //here we're adding another object to req
        req.user = userDoc;
        next();
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid access token");
    }
});