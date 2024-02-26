const jwt = require('jsonwebtoken');
const jwtHelper = require('../utils/JWTUtils')
function jwtCheck(req, res, next) {
    const token = req.headers.authorization;
    
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
