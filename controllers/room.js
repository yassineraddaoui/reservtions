const Room = require('../models/room');
const Book = require('../models/booking');
exports.createRoom = async (req, res) => {
  try {
    const room = new Room({
      capacity: req.body.capacity,
      roomNumber: req.body.roomNumber,
      roomImage:req.file.path.replace("public\\new\\", "")
    });

    const savedRoom = await room.save();
    res.status(201).json(savedRoom);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send an error response if there's an error
  }
};
exports.getRoomById = async(req,res)=>{
  try {
    const room = await Room.findOne({ _id: req.params.id });
    if (!room) throw new Error('Room not found');
    res.status(200).json(room); 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAvailableRooms = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Date parameter is required."
      });
    }

    const bookingDate = new Date(date);
    const startOfDay = new Date(bookingDate);
    startOfDay.setUTCHours(8, 0, 0, 0); // Set start time to 8:00 AM
    const endOfDay = new Date(bookingDate);
    endOfDay.setUTCHours (18, 0, 0, 0); // Set end time to 5:00 PM
    const availableRooms = [];

    // Iterate over each hour between start and end of the day
    const rooms = await Room.find();
    for(const room of rooms){
    for (let hour = new Date(startOfDay); hour < endOfDay; hour.setHours(hour.getHours() + 1)) {
      // Check room availability for the current hour
      console.log(hour)
      const isRoomAvailable = await checkRoomAvailability(room._id,hour);

      if (isRoomAvailable) {
        availableRooms.push(room);
        break;
      }
    }
  }

    res.status(200).json({
      success: true,
      message: "Available rooms fetched successfully.",
      availableRooms: availableRooms
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getRoomByRoomNumber = async (req, res) => {
  try {
    const room = await Room.findOne({ roomNumber: req.params.roomNumber });
    if (!room) throw new Error('Room not found');
    res.status(200).json(room); 
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomNumber: req.params.roomNumber },
      req.body,
      { new: true }
    );
    if (!room) throw new Error('Room not found');
    res.status(200).json(room); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ roomNumber: req.params.roomNumber });
    if (!room) throw new Error('Room not found');
    res.status(200).json(room); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
async function checkRoomAvailability(roomId, date) {
  try {

      // Check if there are any bookings for the room within the specified time range
      const conflictingBookings = await Book.find({
        room: roomId,
        dates: { $in: [date] }
    });
      // If there are conflicting bookings, the room is not available
      return conflictingBookings.length === 0;
  } catch (error) {
      throw new Error(`Could not check room availability: ${error.message}`);
  }
}
