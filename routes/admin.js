const express=require("express")
const router=express.Router()
const {adminLogin,adminSignUp,adminLogout,adminCheck}=require("../controller/admin")


router.post("/login",adminLogin)
router.post("/signUp",adminSignUp)
router.post("/logout",adminLogout)
router.get("/check",adminCheck)

module.exports=router