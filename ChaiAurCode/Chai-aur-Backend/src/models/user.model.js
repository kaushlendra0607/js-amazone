import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,//to make searching optimised in mongoDb index is preferred gpt for more
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//use cloudinary url gpt for more
        required:true,
    },
    coverimage:{
        type:String,//use cloudinary url gpt for more
    },
    watchHistory:[
        {type:Schema.Types.ObjectId,
        ref:"Video"}
    ],
    password:{
        type:String,
        required:[true,"Password is required"],//this is a way to pass some custom message.
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
}
);
//pre middleware is used to do something before a particular action
//like encrypting password before saving the data or doing some manipulations before saving it
//and next is used to pass the flag to main operations after completing middleware operations
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);//we'll use hash methid from bcrypt and it takes two arguments one is what to encrypt and another one is hash round maybe which usually means salting rounds
    next();
});
//we can create costum methods using built in method methods

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);//compare returns true or false
    //bcrypt has a method called caompare which takes the plain pass first and then encrypted pass then it compares both
}

userSchema.methods.generateAccessTokens = function(){//we may need to use async here
    return jwt.sign(//do gpt for more on sign
        {
            _id : this._id,
            fullName:this.fullName,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshTokens = function(){//we may need to use async here
    return jwt.sign(//do gpt for more on sign
        {
            _id : this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);