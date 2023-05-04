const jwt = require('jsonwebtoken');
exports.isAuthAdmin = (req,res,next)=>{
    const  authorization =  req.headers.authorization;
    if(!authorization) return res.status(401).send({message:"Access Denied No provided token"});
    const token = authorization.slice(7,authorization.length);

    try{
        let decode = jwt.verify(token,"I am admin");
        req.admin =decode;
        next();
    }catch(err){
        res.status(400).send({message:"Invalid token"});
    }
}