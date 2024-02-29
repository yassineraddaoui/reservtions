const Book = require('../models/booking');
const Room = require('../models/room');
const jwtHelper = require('../utils/JWTUtils');
const sendEmail = require('../services/mail');
const generateOTP = require('../utils/OTPGenerator');
const ejs = require('ejs'); // Import the 'ejs' module

exports.showBookForm = async (req, res) => {
    try {
        res.render('user/book');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.showConfirmForm = async (req, res) => {
    try {
        res.render('user/confirm');
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const confirmCode = req.params.confirmCode;
        const book = await Book.findOne({ confirmCode: confirmCode });

        if (book && book.confirmCode === confirmCode) {
            book.confirmCode = '';
            await book.save();
            res.render('user/confirmed');
        } else {
            res.render('404');
        }
    } catch (error) {
        res.render('404')
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.createBook = async (req, res) => {
    try {
        const { roomId, hours } = req.body;

        if (!roomId || !hours || !Array.isArray(hours) || hours.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Room ID and a valid list of hours must be provided."
            });
        }

        const room = await Room.findOne({ _id: roomId });

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found."
            });
        }

        const isRoomAvailable = await checkRoomAvailability(roomId, hours);

        if (!isRoomAvailable) {
            return res.status(409).json({
                success: false,
                message: "Room is not available for the specified hours."
            });
        }

        const token = jwtHelper.extractJwt(req);
        const userData = jwtHelper.getDecodedToken(token);
        const { id, email } = userData;

        const confirmCode= String(await generateOTP());
        const book = new Book({
            user: id,
            dates: hours,
            room: roomId,
            bookingDate: new Date(),
            confirmCode: confirmCode
        });

        const confirmationUrl = `http://localhost:5000/book/confirm/${confirmCode}`; 

        const emailTemplate = await ejs.renderFile('views/otpCode.ejs',{confirmationUrl});

        const emailContent = emailTemplate.replace('{{confirmationUrl}}', confirmationUrl);

        sendEmail(email, "Book Confirmation", "html", emailContent);

        await book.save();

        return res.status(201).json({
            success: true,
            message: "Room booked successfully.",
            bookedRoom: book
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: `Could not book room: ${error.message}` });
    }
};

async function checkRoomAvailability(roomId, hours) {
    try {
        const dateArray = hours.map(dateString => new Date(dateString));

        const conflictingBookings = await Book.find({
            room: roomId,
            dates: { $in: dateArray }
        });

        return conflictingBookings.length === 0;
    } catch (error) {
        throw new Error(`Could not check room availability: ${error.message}`);
    }
}
