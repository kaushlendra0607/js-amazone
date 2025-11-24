import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, requied: true },
    email: { type: String, requied: true, unique: true },
    password: { type: String, requied: true },
    cartData: { type: Object, default: {} }
}, { minimize: false });
//when a user will be created a empty cart will be created but mongo neglects empty or null values
//so minimize false will prevent it

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;