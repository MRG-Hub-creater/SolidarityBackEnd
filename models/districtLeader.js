const mongoose = require("mongoose")

const districtSchema=mongoose.Schema({
    districtName:{
        type:String,
        required:true,
        unique:true
    },
    presidentName:{
        type:String,
    },
    presidentImage:{
        type:String
    },
    secretaryName:{
        type:String
    },
    secretaryImage:{
        type:String
    }
    
})

module.exports=mongoose.model("District",districtSchema)