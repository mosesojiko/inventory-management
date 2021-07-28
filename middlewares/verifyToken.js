const jwt = require('jsonwebtoken');

function verifyToken (req, res, next){
    const token = req.header('login-token');
    //console.log(token)
    if(!token) return res.status(401).send('Access Denied');

    try{
        const verified = jwt.verify(token, process.env.USER_SECRET_TOKEN);
        req.user = verified;
        //console.log(token)
        next();

    }catch(err){
        res.status(400).send('Invalid Token')

    }
}
module.exports = verifyToken;