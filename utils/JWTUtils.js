
const jwt=require('jsonwebtoken')

const getDecodedToken = (token)=> {
    token="Bearer "+token
    const tokenValue = token.split(' ')[1];
       
    return jwt.verify(tokenValue, process.env.SECRET_KEY); 
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
const extractJwt = (req,res)=>{
    const { headers: { cookie } } = req;
    if (cookie) {
        const values = cookie.split(';').reduce((res, item) => {
            const data = item.trim().split('=');
            return { ...res, [data[0]]: data[1] };
        }, {});
        return values.token;
    }
    else
        res.status(401).render('/404');
}
module.exports = {extractJwt, generateToken, verifyToken,getDecodedToken };

