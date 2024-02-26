const Room = require('../models/room');

exports.createRoom = async (req, res, next) => {
  try {
    console.log("Creating room !")
    const room = new Room({
      capacity: req.body.capacity,
      roomNumber: req.body.roomNumber
    });
    console.log(room)
    const savedRoom = await room.save();
    res.status(201).json(savedRoom); 
   } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response if there's an error
  }
}

exports.getAllRooms =async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(201).json(rooms); 
  } catch (error) {
    throw new Error(`Could not fetch rooms: ${error.message}`);
  }
}

exports.getRoomById =async (req, res, next) => {
  try {
    const room = await Room.findById(roomId);
    if (!room) throw new Error('Room not found');
    res.status(201).json(room); 
  } catch (error) {
    throw new Error(`Could not fetch room: ${error.message}`);
  }
}

exports.updateRoom =async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(roomId, updateData, { new: true });
    if (!room) throw new Error('Room not found');
    res.status(201).json(room); 
  } catch (error) {
    throw new Error(`Could not update room: ${error.message}`);
  }
}

exports.deleteRoom  =async (req, res, next) => {
   try {
    const room = await Room.findByIdAndDelete(roomId);
    if (!room) throw new Error('Room not found');
    res.status(201).json(room); 
  } catch (error) {
    throw new Error(`Could not delete room: ${error.message}`);
  }
}
