const Admin =require("../models/admin")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")


/************Admin Login */
const adminLogin = async (req,res)=>{
    const{email,password}=req.body
    if (!email || !password) {
        return res.status(400).json({message: "Email and password are required"})
    }
    let admin = await Admin.findOne({email})
    if(admin && await bcrypt.compare(password, admin.password)){
        let token = jwt.sign({email,id:admin._id},process.env.SECRET_KEY,{expiresIn:'2h'});
        
        res.cookie('token',token,{
            httpOnly:true,
            secure:true,
            sameSite:'None',
            maxAge:2*60*60*1000,
        });
        return res.status(200).json({msg:"Logged in Successfully"})
    }
    else{
        return res.status(400).json({error:"Invalid credentials"})
    }

}
/*************Admin Register */
const adminSignUp = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password is required" })
    }
    let admin = await Admin.findOne({ email })
    if (admin) {
        return res.status(400).json({ error: "Email is already exist" })
    }
    const hashPwd = await bcrypt.hash(password, 10)
    const newAdmin = await Admin.create({
        email, password: hashPwd
    })
    let token = jwt.sign({ email, id: newAdmin._id }, process.env.SECRET_KEY)
    return res.status(200).json({ token, admin:newAdmin })

}

/*************Admin Logout */

const adminLogout = (req,res)=>{
    res.clearCookie('token',{
        httpOnly:true,
        secure:true,
        sameSite:"None",
    });
    return res.status(200).json({msg:"Logged Out"})
}

/**********Check Admin */

const adminCheck = async(req,res)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(200).json({isAdmin:false});
        }
        const verified = jwt.verify(token,process.env.SECRET_KEY);
        if(!verified){
            return res.status(200).json({isAdmin:false});
        }
        const admin = await Admin.findById(verified.id);
        if(!admin){
            return res.status(200).json({isAdmin:false});
        }
       return res.status(200).json({isAdmin:true});
    }
    catch(err){
        return res.status(200).json ({isAdmin:false});
    }
}
module.exports={adminLogin,adminSignUp,adminLogout,adminCheck}
