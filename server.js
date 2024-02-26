const express = require('express');
const app = express();
const bodyParser =require('body-parser')
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");
const jwtCheck=require('./middleware/jwtcheck')
app.use(express.static('public'));
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 5000; 
const DB = process.env.DB;


const userRoute = require('./routes/user');
const roomRoute = require('./routes/room');
const bookRoute = require('./routes/book');

app.use("/auth",userRoute)
app.use(jwtCheck); // after Auth requests.
app.use("/room",roomRoute)
app.use("/book",bookRoute)

mongoose.connect(DB).then(()=>console.log("Connected to DB !")).catch(()=>console.log("Error connecting to DB"));
const database = mongoose.connection;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
