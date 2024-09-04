const Razorpay = require('razorpay');
const crypto = require('crypto');
const BOOKING = require('../models/bookingModel')

const orders = async (req, res) => {
    try {

        const { showId, theatreId, movieId, seats } = req.body;
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        let totalAmount= 100
        const booking = await  BOOKING({
            showtimeId: showId,
            theatre: theatreId,
            movie: movieId,
            seatNumbers: seats,
            bookedBy: req.userId,
            totalAmount: totalAmount

        }).save()

        const options = {
            amount: totalAmount*100,
            currency: "INR",
            receipt: booking._id,
        };
     

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.status(200).json(order);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        
    }

};

const verify = (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            receipt,
            theatreId,
            showId,
            movieId
        } = req.body;
        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);

        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");
        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpayPaymentId,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { orders, verify }