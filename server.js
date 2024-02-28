const express = require('express');
const app = express();
const bodyParser =require('body-parser')
app.use(express.static('public/new'));
app.set('view engine','ejs')

const jwtCheck=require('./middleware/jwtcheck')
const errorHandler = require("./middleware/errorHandler");

require('dotenv').config();
const PORT = process.env.PORT || 5000; 
app.use(bodyParser.urlencoded({extended:true})); 


const emailRouter = require('./controllers/mail'); 
app.use('/api', emailRouter); 


const anonymousRoute = require('./routes/anonymous');
const authRoute = require('./routes/user');
const roomRoute = require('./routes/room');
const bookRoute = require('./routes/book');


app.use(authRoute);
app.use("/room",roomRoute);
app.use("/book",jwtCheck,bookRoute);
app.use(anonymousRoute);
const connectDB = require('./utils/db');
connectDB();

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
