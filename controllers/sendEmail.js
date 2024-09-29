const { text } = require('express');
const nodemailer = require('nodemailer');
// const dotenv=require('dotenv');
// dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});
const sendBookingConfirmationEmail = (userEmail) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: userEmail,
        subject: 'Booking Confirmation',
        //   text: `Hello, your booking for ${bookingDetails.movieName} has been confirmed for ${bookingDetails.showtime}.`
        text: 'your booking has been confirmed'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

module.exports = { sendBookingConfirmationEmail }