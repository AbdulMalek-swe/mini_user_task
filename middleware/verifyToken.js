const jwt = require("jsonwebtoken");
const {promisify} = require("util");
module.exports.verifyToken = async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        if(!token){
            res.status(401).json({
                status: "authentiacation failed",
                message: "login  is failed",
                result: error.message
              })
        }
    const decode = await promisify(jwt.verify)(token,process.env.SECRET_JWT_KEY);
       req.user = decode
       next();
    }catch(error){
        res.status(403).json({
            status: "authentiacation failed",
            message: "invalid token",
            result: error.message
          })
    }
     
}