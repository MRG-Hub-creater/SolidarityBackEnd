const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/ConnectionDB');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000
connectDb();


app.use(express.json());
app.use(cors({
    origin:"https://www.solidaritytn.org",
    credentials:true
}
));
app.use(cookieParser());
app.use(express.static("Public"));

app.use("/admin",require("./routes/admin"))
app.use("/news",require("./routes/news"))
app.use("/blog",require("./routes/blog"))
app.use("/districtLeader",require("./routes/districtLeader"))
app.use("/stateLeader",require("./routes/stateLeader"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})