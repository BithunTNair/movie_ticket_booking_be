const Razorpay = require('razorpay');
const crypto = require('crypto');
const BOOKING = require('../models/bookingModel');
const THEATRES = require('../models/theatreModel');
const { default: mongoose } = require('mongoose');

const orders = async (req, res) => {
    try {

        const { showId, theatreId, movieId, seats } = req.body;
        const seatsData = await THEATRES.aggregate([
            {
                $unwind: '$showtimes'
            },
            {
                $match: {
                    'showtimes._id': new mongoose.Types.ObjectId(showId)
                }
            },
            {
                $project: {
                    seats: '$showtimes.seats'
                }
            }
        ]);
        const seatsArray = seatsData.length > 0 ? seatsData[0].seats : [];

        let totalAmount = 0;
        for (let seatNumber of seats) {
            const seat = seatsArray.find(seat => seat.seatNumber === seatNumber);
            if (seat.isBooked) {
                return res.status(404).json({ message: `The ${seatNumber} is already booked ` })
            } else {
                totalAmount = totalAmount + seat.price
            }
        }

        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });
        const booking = await BOOKING({
            showtimeId: showId,
            theatre: theatreId,
            movie: movieId,
            seatNumbers: seats,
            bookedBy: req.userId,
            totalAmount: totalAmount

        }).save()

        const options = {
            amount: totalAmount * 100,
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

const verify = async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            receipt,
            theatreId,
            showId,
            movieId,
            seats
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

        const update = await THEATRES.updateOne({
            'showtimes._id': showId
        },
            {
                $set: {
                    'showtimes.$[showtimeElem].seats.$[seatElem].isBooked': true,
                    'showtimes.$[showtimeElem].seats.$[seatElem].bookedBy': req.userId
                }
            }, {
            arrayFilters: [
                { 'showtimeElem._id': showId },
                { 'seatElem.seatNumber': { $in: seats } }
            ]
        });

        await BOOKING.updateOne({ _id: receipt, $set: { status: 2 } })

    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = { orders, verify }