import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, requied: true },
    description: { type: String, requied: true },
    price: { type: Number, requied: true },
    image: { type: Array, requied: true },
    category: { type: String, requied: true },
    subCategory: { type: String, requied: true },
    sizes: { type: Array, requied: true },
    bestSeller: { type: Boolean },
    date: { type: Number, requied: true }
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
//if product model already exists then that will be used or it will be created.

export default productModel;