const express = require('express')
require('dotenv').config();
const cors = require('cors')
require('dotenv').config()
const connectDB = require("./config/connectDB")
const router = require("./routes/index")
const cookiesParser = require("cookie-parser")

const {app,server} = require("./socket/index")



app.use(cors({
    origin:'https://cool-haupia-36c6cc.netlify.app',
    credentials:true,
}))

const PORT = process.env.PORT || 5050;

app.get('/',(req,res)=>{
    res.json({
        message:`server is running on port ${PORT}`
    })
})

app.use(express.json())
app.use(cookiesParser())
// APi Endpoints 
app.use("/api",router);

connectDB().then(()=>{
    console.log("Db Connected");
})
server.listen(PORT,()=>{
    console.log("SERVer is runnning" + `localhost:${PORT}`)
})
