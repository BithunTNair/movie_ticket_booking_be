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

        const options = {
            amount: 50000,
            currency: "INR",
            receipt: "receipt_order_74394",
        };
        const booking = await  BOOKING({
            showtimeId: showId,
            theatre: theatreId,
            movie: movieId,
            seatNumbers: seats,
            bookedBy: req.userId,
            totalAmount: 50000

        }).save()
        res.status(200).json({ message: "order created successfully", booking })

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
        console.log(error);
        
    }

};

const verify = (req, res) => {
    try {

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { orders, verify }