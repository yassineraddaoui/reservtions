const jwtHelper = require('../utils/JWTUtils')
const verifyRole = (requiredRole) => (req, res, next) => {
    console.log("Check Roles")
    try {
        const token=jwtHelper.extractJwt(req);  

        if (jwtHelper.verifyToken(token)){
            if (jwtHelper.getDecodedToken(token).role==requiredRole){
                next();
            }
            else {
                res.render('404');
            }
    
        }
        else {
            res.render('404');
        }
    } catch (error) {
        next(error)
    }
}

module.exports = verifyRole;
