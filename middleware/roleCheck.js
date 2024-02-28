const jwtHelper = require('../utils/JWTUtils')

const verifyRole = (requiredRole) => (req, res, next) => {
    console.log("Check Roles")
    const token=jwtHelper.extractJwt(req);
    console.log(jwtHelper.getDecodedToken(token))
    try {
        if (jwtHelper.verifyToken(token)){
            if (jwtHelper.getDecodedToken(token).role=requiredRole)
            {
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
        res.render('404');
    }
}

module.exports = verifyRole;
