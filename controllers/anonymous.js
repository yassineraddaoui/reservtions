// Assuming you have already set up your Express app and connected it to your MongoDB database

const express = require('express');
const Room = require('../models/room');

const app = express();

exports.getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        res.render('rooms', { rooms: rooms });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
