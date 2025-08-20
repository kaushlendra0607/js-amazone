import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    complete:{
        type:Boolean,
        default:false
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,//this is special type which is given when we're about to give a refrence
        ref:"User",//importantly refrence should be the exact name passed in thr model like here ref is from sub_todo here
    },
    subTodos:[//by default its type will become array on putting sqr brackets
        {//now we'll model the objects inside array
            type:mongoose.Schema.Types.ObjectId,
            ref:'SubTodo'
        }
    ]
},{timestamps:true});

const Todo = mongoose.model("Todo",todoSchema);