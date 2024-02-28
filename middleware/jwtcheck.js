const jwtHelper = require('../utils/JWTUtils')
const cookieParser = require("cookie-parser");
const express=require('express')
const app = express();
app.use(cookieParser());
function jwtCheck(req, res, next) {
    token=jwtHelper.extractJwt(req);
    try {
        if (jwtHelper.verifyToken(token))
            next();
        else {
            return res.status(401).json({
                success: false,
                message: "Error! Token was not provided."
            });
        }
    } catch (error) {
        next(error)
    }
}

module.exports = jwtCheck;
