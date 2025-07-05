const express=require("express")
const{getBlog,getBlogList,addBlog,editBlog,deleteBlog,upload}=require("../controller/blog")
const verifyToken = require("../middleware/auth")
const router=express.Router()

router.get("/",getBlogList)  //Get all Blog
router.get("/:id",getBlog)  //Get Blog by id
router.post("/",upload.single('file'),verifyToken,addBlog)// add Blog
router.put("/:id",upload.single('file'),editBlog) //edit Blog
router.delete("/:id",deleteBlog) //delete Blog

module.exports=router