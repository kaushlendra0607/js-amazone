import mongoose from "mongoose";

const hospitalSchema = new mongoose.Schema({
    hospitalName:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:true
    },
    addressLine2:{
        type:String,
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    specialisedIn:[
        {
            type:String
        }
    ]
},{timestamps:true});

export const Hospital = mongoose.model("Hospital",hospitalSchema);