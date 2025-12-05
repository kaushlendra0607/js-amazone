import orderModel from "../models/orderModel.js";


//place order  using cash on delivery
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;
        const orderData = { userId, items, amount, address, paymentMethod: "COD", payment: false, date: Date.now() };
        const newOrder = new orderModel(orderData);
        await newOrder.save();
        await orderModel.findByIdAndUpdate(userId,{cartData:{}});
        res.json({success:true,message:"Order Placed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}
//place order  using Stripe
const placeOrderStripe = async (req, res) => {

}
//place order  using Razor Pay
const placeOrderRazorpay = async (req, res) => {

}
//all orders for admin panel
const allOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({});
        console.log(orders);
        res.json({success:true,orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}
//user order data for frontend
const userOrders = async (req, res) => {

    try {
        const userId = req.body;
        const orders = await orderModel.find({userId});
        res.json({success:true,orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message});
    }

}
//update order status from admin panel
const updateStatus = async (req, res) => {

}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus };