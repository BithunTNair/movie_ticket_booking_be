const Razorpay=require('razorpay');
const crypto=require('crypto');
const BOOKING= require('../models/bookingModel')

const orders=async(req,res)=>{

try {

    const { amount, theatreId, showtimeId, seats } = req.body;
    const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    });

    const options = {
        amount:amount*100, 
        currency: "INR",
        receipt: "receipt_order_74394",
    };
    const order = await razorpayInstance.orders.create(options);
    const booking = new BOOKING({
        theatre: theatreId,
        showtime: showtimeId,
        seats: seats,
        bookedBy: req.user._id,
        amount: amount,
        receipt: order.receipt,
        orderId: order.id,
        status: 'pending',
    });
    await booking.save();
    res.status(200).json({
        id: order.id,
        currency: order.currency,
        amount: order.amount,
    });
} catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Something went wrong", error });
}

};

const verify=(req,res)=>{
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports={orders,verify}