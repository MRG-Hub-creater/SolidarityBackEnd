const express=require("express")
const{ getNews,getNewsList,addNews,editNews,deleteNews,upload}=require("../controller/news")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getNewsList)  //Get all news
router.get("/:id",getNews)  //Get news by id
router.post("/",upload.single('file'),verifyToken,addNews)// add news
router.put("/:id",upload.single('file'),editNews) //edit news
router.delete("/:id",deleteNews) //delete news

module.exports=router