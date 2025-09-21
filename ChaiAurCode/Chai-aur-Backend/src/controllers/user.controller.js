import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessTokens();
        const refreshToken = user.generateRefreshTokens();

        user.refreshToken = refreshToken;//now we are adding the rfreshtoken we generated into the refreshtoken field of our database
        await user.save({ validateBeforeSave:false });
        //now we're saving the field but by default saving requires password for validation
        //so we'll set validation false before saving
        return { accessToken,refreshToken };
    } catch (error) {
        throw new ApiError(500,"Something went wrong while generating access and rfresh tokens.");
    }
}

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //chek validation - not empty
    //check if user already exists - username email
    //check for images,avatar
    //upload on claudinary,avatar
    //create user object - create entry in db
    //reomve password and refesh token field from response
    //check for user creation
    //return response
    const { fullName, email , username, password } = req.body;
    //extracting data from request body
    console.log("email",email);

    if(//checkiing if any one of these are empty
        [fullName,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required!");
    }
    const existedUser = await User.findOne({$or:[{email},{username}]});
    if(existedUser){//cheking if user already exists
        throw new ApiError(409,"User already exists");
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //files method is usually provided by multer and it gives some other objects having the name we provided it in the middleware in routes
    //we're using ? to check if the object has been provided or not
    //if its provided well and good if its not the it wont throw additional error

    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    console.log("files is ",req.files," path is",avatarLocalPath);
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    if(!avatarLocalPath){//checking for images/avatar
        throw new ApiError(400,"Avatar is required!");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!avatar){//uptil now we have uploaded avatar
        throw new ApiError(400,"Avatar is required!");
    }
    //create takes an object which contains which fields to create
    const userDoc = await User.create({//now we r entering in database and creating fields
        fullName,
        avatar:avatar.url,
        coverimage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    });
    const createdUser = await User.findById(userDoc._id).select("-password -refreshToken");

    if(!createdUser){//now we'll check if user is actually created or not.
        throw new ApiError(500,"Something went wrong while registering the user!");
    }

    //now we'll return response
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User registered successfully.")
    );
});

const loginUser = asyncHandler(async(req,res)=>{
    //algo by me
    //take out the data from req body
    //check for access and refresh tokens
    //if having a valid access token then straight logged in
    //if having only a refresh token then generate an access token then log in
    //if both expired then take username or email and passowrd
    //compare the credentials
    //if true then generate both tokens and login

    //algo by hitesh chaudhary
    //req=>body=>data
    //username or email
    //find the user
    //password check
    //access and refresh token
    //send cookie

    const {username,email,password} = req.body;
    if(!username && !email){
        throw new ApiError(400,"Atleast username or email is required!");
    }

    const userDoc = await User.findOne({$or:[{username},{email}]});
    if(!userDoc){
        throw new ApiError(404,"User does not exists.");
    }
    const isPasswordValid = await userDoc.isPasswordCorrect(password);
    //NOTE- the methods like findOne etc can be accessed through object created by library classes itself like mongoose
    //here we have User object which we created by mongoose and imported from model
    //but our own made methods like isPasswordCorrect can be accessed through object created by us which is userDoc
    if(!isPasswordValid){
        throw new ApiError(401,"Password incorrect!");
    }
    const {accessToken,refreshToken} = await generateAccessAndRefreshTokens(userDoc._id);
    const loggedInUser = await User.findById(userDoc._id).select("-passeord -refreshToken");

    //by default cookies can be modified on the frontend as well but after setting some options
    //like below now only backend can modify them
    const options = {
        httpOnly : true,
        secure:true
    }
    //finally we're sending response
    return res.status(200).cookie("accessToken",accessToken,options)
            .cookie("refreshToken",refreshToken,options)
            .json(
                new ApiResponse(
                    200,
                    {
                        user:loggedInUser,
                        accessToken,
                        refreshToken
                    },
                    "User logged in successfully"
                )
            );
});

const logOutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{ refreshToken : undefined }
        },
        {
            new:true
        }
    )
    const options = {
        httpOnly : true,
        secure:true
    }

    return res.status(200).clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User logged out."));
});

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if(!incomingToken){
        throw new ApiError(401,"Unauthorized request!");
    }
try {
        const decodedToken = jwt.verify(incomingToken,process.env.REFRESH_TOKEN_SECRET);
        const userDoc = await User.findById(decodedToken._id);
        if(!userDoc){
            throw new ApiError(401,"Invalid refresh token!");
        }
        if(incomingToken !== userDoc.refreshToken){
            throw new ApiError(401,"Refresh token is expired or used!");
        }
        const options={
            httpOnly:true,
            secure:true
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(userDoc._id);
        return res.status(200)
            .cookie("accessToken",accessToken,options)
            .cookie("refreshToken",newRefreshToken,options)
            .json(
                new ApiResponse(
                    200,
                    {accessToken, refreshToken:newRefreshToken},
                    "Access token Refreshed."
                )
            );
} catch (error) {
    throw new ApiError(401,error?.message || "Invalid refresh token");
}
});

export {registerUser,loginUser,logOutUser,refreshAccessToken}