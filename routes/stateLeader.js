const express=require("express")
const{getStateList,getState,addState,editState,deleteState,upload}=require("../controller/stateLeader")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getStateList)  //Get all District Leaders
router.get("/:id",getState)  //Get District Leaders by id
router.post("/",upload.fields([{name:'presidentImage',maxCount:1},{name:'secretaryImage',maxCount:1}]),verifyToken,addState)// add District Leaders
router.put("/:id",upload.fields([{name:'presidentImage',maxCount:1},{name:'secretaryImage',maxCount:1}]),editState) //edit District Leaders
router.delete("/:id",deleteState) //delete District Leaders

module.exports=router