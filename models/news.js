const mongoose = require("mongoose")

const newsSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
     public_id:{
        type:String
    },
    date:{
        type:Date
    }
},{timestamps:true})

module.exports= mongoose.model("News",newsSchema)