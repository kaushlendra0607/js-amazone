import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';

// dotenv.config();
//App config
const app = express();
const port = process.env.PORT || 4000;
connectDB()
connectCloudinary()

//middlewares
app.use(express.json());
app.use(cors());
app.use('/api/user',userRouter);

//api end points
app.get('/',(req,res)=>{
    res.send("Hi there");
});

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`);
});