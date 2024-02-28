const express = require('express');
const app = express();
const connectDB = require('./utils/db');
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
const adminRoute = require('./routes/admin');


app.use(authRoute);
app.use("/room",jwtCheck,roomRoute);
app.use("/book",bookRoute);
app.use("/admin",adminRoute);
app.use(anonymousRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
