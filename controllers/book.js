const Book = require('../models/booking');
const Room = require('../models/room');
const jwtHelper = require('../utils/JWTUtils');
const sendEmail = require('../services/mail');
const OTPHelper = require('../utils/OTPGenerator');
const ejs = require('ejs'); 

exports.confirmCancellation = async(req,res) => {
     try {
        const id= req.params.id;
        await Book.findByIdAndUpdate(id, { canceled: true });   
        this.getUserBooks(req,res);
    } catch (error) {
        console.log(error);
        res.render('404',{loggedIn : true});
    }}
exports.cancelReservation = async(req,res) =>{
    var id = req.body.bookingId ; 
    //const updatedBooking = await Book.findByIdAndUpdate(id, { canceled: true });
    const updatedBooking = await Book.findById(id).populate('user');
    const {user , _id} = updatedBooking;
    const cancelUrl = `http://localhost:5000/book/cancel/${_id}`; 

    const emailTemplate = await ejs.renderFile('views/user/confirmCancelMail.ejs',{cancelUrl});

    const emailContent = emailTemplate.replace('{{cancelUrl}}', cancelUrl);

    sendEmail(user.email, "Book Cancellation Confirm", "html", emailContent);
    console.log(updatedBooking)

    res.status(200).json({ success: true, message: `success` });
}
exports.getUserBooks = async (req, res) => {
    const token = jwtHelper.extractJwt(req);
    const userData = jwtHelper.getDecodedToken(token);
    const userId = userData.id;

    try {
        let userBookings = await Book.find({ user: userId }).populate('room');
        
        userBookings = userBookings.map(booking => ({
            ...booking.toObject(),
            confirmCode: booking.confirmCode ? false : true
        }));
        res.render('user/roomBooked',{loggedIn: true,books:userBookings });

    } catch (error) {
        console.log(error);
        res.render('404');
    }
};

  
exports.showBookForm = async (req, res) => {
    try {
        res.render('user/book',{loggedIn: true });
    } catch (error) {
        res.render('404',{loggedIn : true});
    }
};

exports.showConfirmForm = async (req, res) => {
    try {
        res.render('user/confirm',{loggedIn : true});
    } catch (error) {
        res.render('404',{loggedIn : true});
    }
};

exports.confirmBooking = async (req, res) => {
    try {
        const confirmCode = req.params.confirmCode;
        if(OTPHelper.verifyToken(confirmCode))
        res.render('404');
        const book = await Book.findOne({ confirmCode: confirmCode });

        if (book && book.confirmCode === confirmCode) {
            book.confirmCode = '';
            await book.save();
            res.render('user/confirmed',{loggedIn: true});
        } else {
            res.render('404',{loggedIn:true});
        }
    } catch (error) {
        res.render('404',{loggedIn : true})
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
        
        const confirmCode= String(OTPHelper.generateSecret());
        const bookingDate = new Date();
        const book = new Book({
            user: id,
            dates: hours,
            room: roomId,
            bookingDate: bookingDate,
            confirmCode: confirmCode
        });
        const roomBooked = await book.save();;
        const confirmationUrl = `http://localhost:5000/book/confirm/${confirmCode}`; 

        const emailTemplate = await ejs.renderFile('views/user/confirmBookingMail.ejs',{confirmationUrl,bookingDate});

        let emailContent = emailTemplate.replace('{{confirmationUrl}}', confirmationUrl);
        emailContent = emailTemplate.replace('{{bookingDate}}', bookingDate);

        sendEmail(email, "Book Confirmation", "html", emailContent);


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
