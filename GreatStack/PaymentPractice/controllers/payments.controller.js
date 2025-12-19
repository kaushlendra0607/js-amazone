import { createRazorpayInstance } from "../config/razorPay.config.js";

const razorPayInstance = createRazorpayInstance();
export const createOrder = async (req, res) => {
    //Todo IMP=> this is just for practice, never fetch amount from frontend like this
    //todo IMP=> do like first fetch courseId from frontend then with the help of Id fetch amount from Data base
    const { courseId, amount } = req.body;

    const options = {
        amount: amount * 100, //amount in smallest currency unit
        currency: "INR",
        reciept: `reciept_order_1`
    }

    try {
        (await razorPayInstance).orders.create(options, (error, order) => {
            if (error) {
                return res.status(500).json({
                    success: false,
                    message: error.message
                });
            }
            return res.status(200).json({
                success: true,
                data: order,
                message: "Order created."
            });
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Something failed."
        });
    }
}

export const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    const secret = process.env.RAZOR_KEY_SECRET

    const hmacObject = crypto.createHmac("sha256",secret);
    hmacObject.update(order_id + "|" + payment_id);
    const generatedSignature = hmacObject.digest("hex");

    if(generatedSignature === signature){
        //todo => can perform some operations here
        return res.status(200).json({
            success:true,
            message:"Payment verified."
        });
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Payment not verified."
        });
    }
}