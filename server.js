const express = require('express');
const app = express();
const bodyParser =require('body-parser')
const jwtCheck=require('./middleware/jwtcheck')
require('dotenv').config();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.urlencoded({extended:true})); 

app.use(express.static('public/new'));
app.set('view engine','ejs')

const emailRouter = require('./controllers/mail'); 
app.use('/api', emailRouter); 


const anonymousRoute = require('./routes/anonymous');
const authRoute = require('./routes/user');
const roomRoute = require('./routes/room');
const bookRoute = require('./routes/book');
const connectDB = require('./utils/db');

app.get('/',(req, res) => {
    res.render('index.ejs')
});
app.get('/add-room',jwtCheck,(req, res) => {
    res.render('administrator/addRoom.ejs')
});
app.get('/index',(req, res) => {
    res.render('index.ejs')
});
app.get('/contact',(req, res) => {
    res.render('contact.ejs')
});

app.get('/about',(req, res) => {
    res.render('about.ejs')
});
app.get('/signin',(req, res) => {
    res.render('sign-in.ejs')
});
app.get('/signup',(req, res) => {
    res.render('sign-up.ejs')
});
app.use("/auth",authRoute);
app.use("/room",jwtCheck,roomRoute);
app.use("/book",bookRoute);
app.use(anonymousRoute);
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
