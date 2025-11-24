import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'//for accessing the cookies of browser do gpt for more

const app = express();
//use actually a middleware configuration which means it inquires or manipulates some code before request reaches backend
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:'16kb'}));// do gpt for more
app.use(express.urlencoded({extended:true,limit:'16kb'}));
//In short: extended: true allows you to post "nested" objects.
//used for parsing HTML form submissions (URL-encoded data).
app.use(express.static("public"));
//This tells Express to serve static files (like HTML, CSS, JS, images) from a specific folder — here, "public".
app.use(cookieParser());

//routes import
import userRouter from "./routes/user.routes.js";

//routes declaration
app.use("/api/v1/users",userRouter);
console.log(`server running on ${process.env.CORS_ORIGIN}`);


export { app }