const State =require("../models/stateLeader")
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


 // Read stateLeaders 
 const getStateList=async(req,res)=>{
    const stateList=await State.find()
    return res.json(stateList)
}

const getState=async(req,res)=>{
    const state=await state.findById(req.params.id)
    res.json(state)
}

//Add new stateLeaders

const addState=async(req,res)=>{
    console.log(req.user);
    const {presidentName,secretaryName}=req.body; 

    if(!presidentName || !secretaryName)
    {
        res.json({message:"Required fields can't be empty"});
    }
    const presidentImage = req.files?.presidentImage?.[0]?.filename || 'default-image.jpg';
    const secretaryImage = req.files?.secretaryImage?.[0]?.filename || 'default-image.jpg';


    const newState=await State.create({
        presidentName,presidentImage,secretaryName,secretaryImage  
     
    });
   return res.json(newState);
}

// Edit stateLeaders

    const editState=async(req,res)=>{
    const {presidentName,secretaryName}=req.body 
    let state=await State.findById(req.params.id)

    try{
        if(state){
            let presidentImage=req.files?.presidentImage?.[0]?.filename || state.presidentImage;
            let secretaryImage=req.files?.secretaryImage?.[0]?.filename || state.secretaryImage;
            const updatedState = await State.findByIdAndUpdate(req.params.id,{presidentName,presidentImage,secretaryName,secretaryImage},{new:true})
            res.json(updatedState)
        }
    }
    catch(err){
        return res.status(404).json({message:err})                     
    }
}

//Delete StateLeaders

const deleteState=async(req,res)=>{
    try{
        await State.deleteOne({_id:req.params.id})
        res.json({status:"ok"})
    }
    catch(err){
        return res.status(400).json({message:"error"})
    }
}

module.exports={getStateList,getState,addState,editState,deleteState,upload}