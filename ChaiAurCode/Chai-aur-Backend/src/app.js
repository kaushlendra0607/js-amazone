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
app.use(express.urlencoded({extended:true,limit:'16kb'}));//some special characters like @ cause trouble in urls so we use encoders for them
app.use(express.static("public"));//just tells about data which is public gpt for more

export { app }