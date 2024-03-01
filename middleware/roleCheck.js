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
                res.render('sign-in',{loggedIn: false });
            }
        }
        else {
            res.render('sign-in',{loggedIn: false });
        }
    } catch (error) {
        res.render('404',{loggedIn: false });
        next(error)
    }
}


module.exports = verifyRole;
