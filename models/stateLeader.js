const mongoose = require("mongoose")

const stateSchema=mongoose.Schema({
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
    },
    secretaryName2:{
        type:String
    },
    secretaryImage2:{
        type:String
    }
    
})

module.exports=mongoose.model("State",stateSchema)