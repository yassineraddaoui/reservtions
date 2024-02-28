const Room = require('../models/room');

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();

        res.render('administrator/rooms.ejs', { rooms: rooms });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
exports.addRoom = async (req, res) => {
    try {
        res.render('administrator/addRoom.ejs');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}