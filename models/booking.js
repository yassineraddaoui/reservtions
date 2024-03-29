const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  dates: { type: [Date], required: true },
  bookingDate: { type: Date, required: true}, 
  confirmCode : { type:String,required:false},
  canceled : { type:Boolean,required:true,default:false},
});

module.exports = mongoose.model('Booking', bookingSchema);
