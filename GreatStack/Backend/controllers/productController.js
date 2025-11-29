import { v2 } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];
        const images = [image1, image2, image3, image4].filter((item) => item != undefined);
        /*Without Promise.all, images would upload one by one (slow).
        With Promise.all, all images upload at once (fast). */
        const imagesUrl = await Promise.all(
            images.map(async (img) => {
                let result = await v2.uploader.upload(img.path, { resource_type: 'image' });
                console.log(result.resource_type);
                console.log(`\n${result.format}\n`);
                console.log(result.secure_url);
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            bestseller: bestseller == "true" ? true : false,
            category,
            subCategory,
            sizes,
            image: imagesUrl,
            date: Date.now()
        }

        const product = new productModel(productData);
        await product.save();

        console.log(images);
        console.log(imagesUrl);
        res.json({ success: true, message: "product saved" });

    } catch (error) {
        console.log("Adding product Error.");
        res.json({ success: false, message: error.message });
    }
}

const listProduct = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({ success: true, products });
    } catch (error) {
        console.log("Couldn't load products", error);
        res.json({ success: false, message: error.message });
    }

}

const removeProduct = async (req, res) => {

    try {
        await productModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Product removed!" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}

const singleProductInfo = async (req, res) => {

    try {
        const { productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({ success: true, product });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

}


export { addProduct, listProduct, removeProduct, singleProductInfo };