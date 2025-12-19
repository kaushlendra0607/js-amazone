import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/payment.routes.js";

dotenv.config();

const port = 3005;
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api',router)

app.get('/',(req,res)=>{
    res.send("Hi There...");
});

app.listen(port,()=>{
    console.log("Server running on port: ",port);
});