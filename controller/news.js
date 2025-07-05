const News=require("../models/news")
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const storage = require("../config/storage");
  const upload = multer({ storage })

/********Read All news  */

const getNewsList=async(req,res)=>{
    const newsList=await News.find()
    return res.json(newsList)
}

/************Read News by Id */
const getNews=async(req,res)=>{
    const news=await News.findById(req.params.id)
    res.json(news)
}

/************Add News */
const addNews=async(req,res)=>{
    console.log(req.admin)
    const {title,content,date}=req.body 

    if(!title || !content)
    {
        res.json({message:"Required fields can't be empty"})
    }
    const imageUrl=req.file?.path; // CLoudinary url
    const newNews=await News.create({
        title,content,image:imageUrl,public_id:req.file?.filename,date
    })
   return res.json(newNews)
}

/************Edit News */

const editNews=async(req,res)=>{
    try{
    const {title,content,date}=req.body 
    let news=await News.findById(req.params.id)
        if(!news){
            return res.status(404).json({message:"News not found"})
        }
        let image=news.image;
        let public_id=news.public_id;
        
        if(req.file){
            if(news.public_id){
                await cloudinary.uploader.destroy(news.public_id);
            }
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:'news'

            });
            image = result.secure_url;
            public_id=result.public_id;
        }
            const updatedNews =  await News.findByIdAndUpdate(req.params.id,{title,content,image,public_id,date},{new:true})
            return res.json(updatedNews) 
           
        
    }
    catch(err){
        return res.status(404).json({message:err})
    }
    
}

/******************Delete News */
const deleteNews=async(req,res)=>{
    try{
     const news = await News.findById(req.params.id);
     if(news?.public_id){
        await cloudinary.uploader.destroy(news.public_id);
     }
        await News.deleteOne({_id:req.params.id})
        return res.json({message:"News deleted Successfully"})
    }
    catch(err){
        return res.status(400).json({message:"Failed to delete"})
    }
}

module.exports={getNews,getNewsList,addNews,editNews,deleteNews,upload}