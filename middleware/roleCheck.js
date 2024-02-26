const jwtHelper = require('../utils/JWTUtils')

const verifyRole = (requiredRole) => (req, res, next) => {
    try {
        const token = req.headers.authorization;
        console.log("Role check middleware !")

        if (jwtHelper.getDecodedToken(token).role=requiredRole)
        {
            next();
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Unauthorized."
            });
        }
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });
    }
}

module.exports = verifyRole;
