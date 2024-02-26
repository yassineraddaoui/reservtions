
const jwt=require('jsonwebtoken')
function getId(token){
    const tokenValue = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET_KEY);    
    return decodedToken;
}

module.exports = getId;
