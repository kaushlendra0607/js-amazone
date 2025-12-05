import adminAuth from '../middlewares/adminAuth.js';
import express from 'express';
import { placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus } from '../controllers/orderController.js';
import authUser from '../middlewares/auth.js';

const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);
//payment feature
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);
orderRouter.post('/razorpay',authUser,placeOrderRazorpay);
//user features
orderRouter.post('/userorder',authUser,userOrders);

export default orderRouter;