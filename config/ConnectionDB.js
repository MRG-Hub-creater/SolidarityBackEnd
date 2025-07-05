const mongoose = require('mongoose');
const connectDb = async()=>{
    await mongoose.connect(process.env.CONNECTION_STRING)
    .then(()=>console.log("connected"))
    .catch((err)=>console.error("Connection error:",err))
}
module.exports=connectDb