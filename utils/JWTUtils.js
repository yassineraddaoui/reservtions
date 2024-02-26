
const jwt=require('jsonwebtoken')
function getId(token){
    const tokenValue = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET_KEY);
    
    var userData = {
                userId: decodedToken.userId,
                email: decodedToken.email
            };
            console.log(userData)
    return userData;
}

module.exports = getId;
