// import mongoose from "mongoose";
// require('dotenv').config({path:'./env'})
// import { DB_NAME } from "./constants";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})

connectDB();

/*
import express from "express"
const app = express()

(async()=>{
    try {
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        app.on("error",(error)=>{
            console.log("ERROR: ",error);
            throw error;
        })
        app.listen(process.env.PORT,()=>{
            console.log(`app is running on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error("ERROR: ",error);
        throw error;
    }
})()
*/