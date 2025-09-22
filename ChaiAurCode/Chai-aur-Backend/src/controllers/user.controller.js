import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";
import { isObjectIdOrHexString } from "mongoose";

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

const changeCurrentPassword = asyncHandler(async(req,res)=>{
    const { oldPassword, newPassword } = req.body;
    const userDoc = await User.findById(req.user?._id);
    const isPasswordCorrect = await userDoc.isPasswordCorrect(oldPassword);
    if(!isPasswordCorrect){
        throw new ApiError(400,"Incorrect old password!");
    }
    userDoc.password = newPassword;
    await userDoc.save({validateBeforeSave:false});
    return res.status(200).json(new ApiResponse(200,{},"Password changed successfully"));
});

const getCurrentUser = asyncHandler(async(req,res)=>{
    return res.status(200).json(new ApiResponse(200,req.user,"Current user fetched successfully"));
//we r able to return user object from req bcz we created this object inside user in auth middleware
});

const updateAccountCredentials = asyncHandler(async(req,res)=>{
    const {fullName,email} = req.body;
    if(!fullName || !email){
        throw new ApiError(400,"Allfields are required");
    }

    const userDoc = await User.findByIdAndUpdate(
        req.user?._id,
        {
            fullName,
            email:email
        },
        {
            new:true//by new true the updated value is returned as well
        }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200,userDoc,"account data updated successfully"));
});

const updateUserAvatar = asyncHandler(async(req,res)=>{
    const avatarLocalPath = req.file?.path;
    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is missing");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if(!avatar.url){
        throw new ApiError(500,"Error while uploading on cloudinary");
    }
    const userDoc = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar:avatar.url
            }
        },
        {new:true}
    );
    //todo : delete user's old avatar from cloud
    return res.status(200)
    .json(new ApiResponse(200,userDoc,"Avatar updated successfully"));
});

const updateUserCoverImage = asyncHandler(async(req,res)=>{
    const coverImageLocalPath = req.file?.path;
    if(!coverImageLocalPath){
        throw new ApiError(400,"Cover image file is missing");
    }
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    if(!coverImage.url){
        throw new ApiError(500,"Error while uploading cover image on cloudinary");
    }
    const userDoc = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                coverimage:coverImage.url
            }
        },
        {new:true}
    );
    return res.status(200)
    .json(new ApiResponse(200,userDoc,"Cover image updated successfully."));
});

const getUserChannelProfile = asyncHandler(async()=>{
    const {username} = req.params;
    if(!username?.trim()){
        throw new ApiError(400,"Invalid user name.");
    }

    const channel = await User.aggregate([
        {
            $match:{
                username:username?.toLowerCase()//This is case-sensitive unless you set collation or regex.
                //do gpt for more
            }
        },
        {
            $lookup:{//lookup is used for connecting two documents, do gpt for more
                from:"subscriptions",//currently we r in User model so from takes the model to which we r joining from User
                //Collection names (from Mongoose models) → pluralized + lowercased by default.
                //Field names in aggregation (as, $addFields, $project, etc.) → exactly what you type, no conversion, case-sensitive.
                localField:"_id",//this is the field in current model which is User here whose values will be common in both
                foreignField:"channel",//this is field in foreign model the model to which we r connecting to which will be common
                //this means that _id in User and the id in channel field of Subscription have same value
                //this must match the actual MongoDB collection name (not the model name unless Mongoose automatically pluralized it correctly).
                as:"Subscribers"//this is the name of the field which will be generated in User model having the details of other model's field
                //the name is choosen by us!
            }
        },
        {
            $lookup:{
                from:"subscriptions",
                localField:"_id",
                foreignField:"subscriber",
                as:"SubscribedTo"
            }
        },
        {
            $addFields:{//$addFields adds a new field (or overwrites if already exists) in the documents flowing through the aggregation pipeline.
                subscribersCount:{//this name subscribersCount is choosen by us, this is the field added by add fields
                    $size : "$Subscribers"//this size info is extracted from  the field we generated above
                    //we r using $ as a ayntax which tells that its a field
                },
                channelsSubscribedToCount:{//another field added by addfields
                    $size:"$SubscribedTo"
                },
                isSubscribed:{ // this is the name of the new field we are adding to each document
                    $cond:{// $cond is like an if-else operator in aggregation
                        // $in checks if a value exists inside an array
                        // here we check if the current logged-in user (req.user?._id)
                        // exists inside the array of "subscriber" fields from Subscribers array
                        if:{$in:[req.user?._id, "$Subscribers.subscriber"]},// the .subscriber is actually the field we defined in our subscription model
                        then:true,// if condition is true → set isSubscribed = true
                        else:false// if condition is false → set isSubscribed = false
                    }
                }
            }
        },
        {
            $project: { // $project is used to control which fields should appear in the final output
                fullName: 1, // include the "fullName" field (1 means include, 0 would exclude and those not written will also be exluded)
                username: 1, // include the "username" field
                subscribersCount: 1, // include the computed field that shows how many subscribers this user has
                channelsSubscribedToCount: 1, // include the computed field that shows how many channels this user has subscribed to
                isSubscribed: 1, // include the boolean field that tells if the logged-in user is subscribed to this channel
                avatar:1,
                coverImage:1,
                email:1//including avatar coverImage and email as well
            }
        }

    ]);

    if(!channel.length){
        // channel is the result array returned by aggregation
        // if its length is 0 → means no document matched (channel not found)
        // in that case we throw an ApiError with status code 404
        throw new ApiError(404,"Channel does not exists..");
    }
            // aggregation always returns an array of documents, even if only one document matches
            //the first element that is value at zeroth index is the actual info for us!
           // here we are fetching the first (and usually only) element of that array
           // this is a common pattern when you expect a single document from aggregation
           // i.e., "zeroth index policy":
           //   - aggregation result = [] → empty, no match
           //   - aggregation result = [ {...} ] → match found, access it via index 0
           // without [0], you would get the array itself, not the actual document
    return res.status(200)
    .json(new ApiResponse(200,channel[0],"User channel fetched successfully!"));
});

export {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountCredentials,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile
}