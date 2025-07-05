const District =require("../models/districtLeader")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname
      cb(null, filename)
    }
})

 const upload = multer({ storage: storage })


 // Read districtLeaders 
 const getDistrictList=async(req,res)=>{
    const districtList=await District.find()
    return res.json(districtList)
}

const getDistrict=async(req,res)=>{
    const district=await District.findById(req.params.id)
    res.json(district)
}

//Add new districtLeaders

const addDistrict=async(req,res)=>{
    console.log(req.user);
    const {districtName,presidentName,secretaryName}=req.body; 

    if(!districtName || !presidentName || !secretaryName)
    {
        res.json({message:"Required fields can't be empty"});
    }
    const presidentImage = req.files?.presidentImage?.[0]?.filename || 'default-image.jpg';
    const secretaryImage = req.files?.secretaryImage?.[0]?.filename || 'default-image.jpg';


    const newDistrict=await District.create({
        districtName,presidentName,presidentImage,secretaryName,secretaryImage  
     
    });
   return res.json(newDistrict);
}

// Edit districtLeaders

    const editDistrict=async(req,res)=>{
    const {districtName,presidentName,secretaryName}=req.body 
    let district=await District.findById(req.params.id)

    try{
        if(district){
            let presidentImage=req.files?.presidentImage?.[0]?.filename || district.presidentImage;
            let secretaryImage=req.files?.secretaryImage?.[0]?.filename || district.secretaryImage;
            const updatedDistrict = await District.findByIdAndUpdate(req.params.id,{districtName,presidentName,presidentImage,secretaryName,secretaryImage},{new:true})
            res.json(updatedDistrict)
        }
    }
    catch(err){
        return res.status(404).json({message:err})                     
    }
}

//Delete districtLeaders

const deleteDistrict=async(req,res)=>{
    try{
        await District.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

module.exports={getDistrictList,getDistrict,addDistrict,editDistrict,deleteDistrict,upload}