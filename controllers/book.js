const Book = require('../models/booking');
const Room=require('../models/room')
const jwtHelper = require('../utils/JWTUtils')
exports.createBook = async (req, res, next) => {
    try {
        const { roomNumber, hours } = req.body;

        // Check if roomNumber and hours are provided
        if (!roomNumber || !hours || !Array.isArray(hours) || hours.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Room ID and a valid list of hours must be provided."
            });
        }

        // Retrieve the room from the database
        const room = await Room.findById(roomNumber);

        // Check if the room exists
        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found."
            });
        }

        // // Check if the room is available for the specified hours
        // const isRoomAvailable = await checkRoomAvailability(room, hours);

        // if (!isRoomAvailable) {
        //     return res.status(409).json({
        //         success: false,
        //         message: "Room is not available for the specified hours."
        //     });
        // }

        // Book the room for the specified hours
        const token = req.headers.authorization;
        room.bookings.push({
            user: jwtHelper(token).userId,
            hours: hours
        });

        await room.save();

        return res.status(201).json({
            success: true,
            message: "Room booked successfully.",
            bookedRoom: room
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: `Could not book room: ${error.message}`
        });
    }
}
