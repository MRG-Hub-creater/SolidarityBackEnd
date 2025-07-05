const express=require("express")
const{getDistrictList,getDistrict,addDistrict,editDistrict,deleteDistrict,upload}=require("../controller/districtLeader")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getDistrictList)  //Get all District Leaders
router.get("/:id",getDistrict)  //Get District Leaders by id
router.post("/",upload.fields([{name:'presidentImage',maxCount:1},{name:'secretaryImage',maxCount:1}]),verifyToken,addDistrict)// add District Leaders
router.put("/:id",upload.fields([{name:'presidentImage',maxCount:1},{name:'secretaryImage',maxCount:1}]),editDistrict) //edit District Leaders
router.delete("/:id",deleteDistrict) //delete District Leaders

module.exports=router