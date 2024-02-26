const express = require('express');
const app = express();
const bodyParser =require('body-parser')
const jwtCheck=require('./middleware/jwtcheck')
require('dotenv').config();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.urlencoded({extended:true})); 

app.use(express.static('public/new'));
app.set('view engine','ejs')


const userRoute = require('./routes/user');
const roomRoute = require('./routes/room');
const bookRoute = require('./routes/book');
const connectDB = require('./utils/db');

app.get('/',(req, res) => {
    res.render('index.ejs')
});
app.get('/sign-in',(req, res) => {
    res.render('sign-in.ejs')
});
app.get('/sign-up',(req, res) => {
    res.render('sign-up.ejs')
});
app.use("/auth",userRoute)
app.use("/room",jwtCheck,roomRoute)
app.use("/book",bookRoute)

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
