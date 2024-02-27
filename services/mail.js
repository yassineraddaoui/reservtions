const nodemailer = require('nodemailer');

function sendEmail(to, subject, text, html) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });

        const message = {
            from: 'Reservation@booking.com',
            to: to,
            subject: subject,
            text: text,
            html: html
        };

        transporter.sendMail(message, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

module.exports = sendEmail;
