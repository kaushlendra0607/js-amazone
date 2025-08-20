import mongoose from "mongoose";

const userSchema = new mongoose.Schema( {//do gpt for more about schema
        userName: {
            type:String,
            required:true,
            unique:true
        },//by this way we can give more characteristics to our fields like required and more
        email :{
            type:String,
            unique:true,
            lowercase:true
        },
        password:{
            type:String,
            required:[true,"password is required"],//with arrays we can send some messages as well
        },
        isActive:Boolean//this is how fields are defined for database
    },
    {timestamps:true}//do chat gpt for more about timestamps in schema and also check why its in plural
);

export const User = mongoose.model("User",userSchema);//model takes two things what model to make and on whoose basis ,here it will make model User on basis of userSchema Do gpt for more
//in dtabase mongodb the name User given to model will be made plural and all in small letters