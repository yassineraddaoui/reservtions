const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true }
});

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true,unique: true },
  capacity: { type: Number, required: true },
  roomImage: { type: String, required: true },
  equipment: [equipmentSchema]

});

module.exports = mongoose.model('Room', roomSchema);
