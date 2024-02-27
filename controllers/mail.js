const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router(); // Initialize the router

router.post("/send", async (req, res) => {

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    

    // Message object
    let message = {
        from: 'Reservation@booking.com',
        to: 'Recipient <recipient@example.com>',
        subject: 'Confirmation of your booking !',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };  
    transporter.sendMail(message, (err, info) => {
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        if (err) {
            res.status(500).json({ // Changed status code to 500 for error
                status: "error",
                message: "Failed to send email",
                error: err
            });
        } else {
            res.status(200).json({
                status: "success",
                message: "Email sent successfully",
                data: info // Changed response to info
            });
        }

    });
});

module.exports = router; // Export the router
