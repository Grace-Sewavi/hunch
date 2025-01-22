const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoute = require("./Routes/postRoute")
require("dotenv").config();


const app = express();


app.use(bodyParser.json());



const mongourl = process.env.MONGO_URL
mongoose.connect(mongourl).then(()=>{
    console.log("Database connected successfully")
}).catch((err)=>{
    console.log(err.message)
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "something went wrong"
    });
});



app.use('/', postRoute);



const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server listening on port ${port}`)
});