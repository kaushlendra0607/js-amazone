import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            //This is the actual connection object created after calling mongoose.connect().
            console.log("DB connected");
        });
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
        /* mongoose.connect() = starting the engine
        mongoose.connection = dashboard that shows engine status */
    } catch (error) {
        console.log("Didn't connect to Data Base", error);
    }
}

export default connectDB;