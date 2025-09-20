import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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
})

export {registerUser}