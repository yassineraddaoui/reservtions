const jwtHelper = require('../utils/JWTUtils')
const cookieParser = require("cookie-parser");
const express=require('express')
const app = express();
app.use(cookieParser());
function jwtCheck(req, res, next) {
    let token = null;
    console.log("JWT check !")
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        token = values.token;
    }
    else
        res.status(401).render('/error');
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
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
}

module.exports = jwtCheck;
