const express = require('express');
const app = express();
const bodyParser =require('body-parser')
app.use(bodyParser.json());
const jwtCheck=require('./middleware/jwtcheck')
app.use(express.static('public'));
require('dotenv').config();
const PORT = process.env.PORT || 5000; 


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
