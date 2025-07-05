const Blogs=require("../models/blog");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const storage = require("../config/storage");
  const upload = multer({ storage })

/***********Read Blogs */

const getBlogList=async(req,res)=>{
    const blogList=await Blogs.find()
    return res.json(blogList)
}

const getBlog=async(req,res)=>{
    const blog=await Blogs.findById(req.params.id)
    res.json(blog)
}

/************ Add Blog     ************ */

const addBlog=async(req,res)=>{
    console.log(req.admin)
    const {title,content,date}=req.body 

    if(!title || !content)
    {
        res.json({message:"Required fields can't be empty"})
    }

    const imageUrl=req.file?.path; // CLoudinary url
    const newBlog=await Blogs.create({
        title,content,image:imageUrl,public_id:req.file?.filename,date
    })
   return res.json(newBlog)
}

/************ Edit Blog    ******************* */

const editBlog=async(req,res)=>{
    try{
    const {title,content,date}=req.body 
    let blog=await Blogs.findById(req.params.id)
    if(!blog){
        return res.status(404).json({message:"Blogs not found"})
    }
    let image=blog.image;
    let public_id=blog.public_id;

    if(req.file){
                if(blog.public_id){
                    await cloudinary.uploader.destroy(blog.public_id);
                }
            
        const result = await cloudinary.uploader.upload(req.file.path,{
            folder:'news'
        });
        image = result.secure_url;
        public_id =result.public_id;
    }
    
       const updatedBlogs = await Blogs.findByIdAndUpdate(req.params.id,{title,content,image,public_id,date},{new:true})
          return  res.json(updatedBlogs)
        
    }
    catch(err){
        return res.status(404).json({message:err})
    }
    
}

/************** Delete Blog  ********* */

const deleteBlog=async(req,res)=>{
    try{
const blog = await Blogs.findById(req.params.id);
if(blog?.public_id){
    await cloudinary.uploader.destroy(blog.public_id);
}

        await Blogs.deleteOne({_id:req.params.id})
        return res.json({message:"Events deleted Successfully"})
    }
    catch(err){
        return res.status(400).json({message:"Failed to delete"})
    }
}

module.exports={getBlog,getBlogList,addBlog,editBlog,deleteBlog,upload}