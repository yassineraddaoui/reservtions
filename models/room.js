const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true,unique: true },
  capacity: { type: Number, required: true },
  roomImage: { type: String, required: true }
});

module.exports = mongoose.model('Room', roomSchema);
