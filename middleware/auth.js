const jwt=require("jsonwebtoken")

const verifyToken=async(req,res,next)=>{
    let token=req.cookies.token;

    if(token){
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return res.status(400).json({message:"Invalid token"})
            }
            else{
                console.log(decoded)
                req.user=decoded
            }
        })
        next()
    }
    else{
        return res.status(400).json({message:"Invalid token"})
    }
}
module.exports=verifyToken