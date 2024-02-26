const express = require('express');
const app = express();
const bodyParser =require('body-parser')
const jwtCheck=require('./middleware/jwtcheck')
require('dotenv').config();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.json());
app.use(express.static('public'));


const userRoute = require('./routes/user');
const roomRoute = require('./routes/room');
const bookRoute = require('./routes/book');
const connectDB = require('./utils/db');

app.use("/auth",userRoute)
app.use(jwtCheck); // after Auth requests.
app.use("/room",roomRoute)
app.use("/book",bookRoute)

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
