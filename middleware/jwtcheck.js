const jwt = require('jsonwebtoken');

function jwtCheck(req, res, next) {
    const token = req.headers.authorization;

    // Check if the token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Error! Token was not provided."
        });
    }

    try {
        const tokenValue = token.split(' ')[1];
        const decodedToken = jwt.verify(tokenValue, process.env.SECRET_KEY);

        req.userData = {
            userId: decodedToken.userId,
            email: decodedToken.email
        };

        next(); 
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
}

module.exports = jwtCheck;
