
const jwt=require('jsonwebtoken')

const getDecodedToken = (token)=> {
    const tokenValue = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenValue, process.env.SECRET_KEY);    
    return decodedToken;
}

const generateToken = (user)=>{

    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
}
const verifyToken = (token)=>{
    token="Bearer "+token
    if (!token) {
        return false;
    }
    const tokenValue = token.split(' ')[1];

    jwt.verify(tokenValue, process.env.SECRET_KEY);
    return true;
}
module.exports = { generateToken, verifyToken,getDecodedToken };

