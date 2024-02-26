const mongoose = require('mongoose');
const DB_URL=process.env.DB_URL;

const connectDB = async () => {
  mongoose.connect(DB_URL)
  .then(()=>console.log("Connected to DB !"))
  .catch(()=>console.log("Error connecting to DB"));

};

module.exports = connectDB;