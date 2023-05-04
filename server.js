const express = require("express");
const app =express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const uuidv4 = require('uuid');
const compression = require('compression');
const cors = require("cors");
require('dotenv').config();

app.use(cors());


const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images");
    },
    filename:(req,file,cb)=>{
        cb(null,uuidv4.v4()+file.originalname);
    }
})


app.use(express.json());
app.use(compression())
app.use(bodyParser.urlencoded({extended:true}));







require('./startup/db')();

require('./startup/route')(app);

const PORT = process.env.PORT || 8000;


mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cme43aq.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`
).then(()=>{
    app.listen(PORT,function(){
        console.log("Server is run on port "+PORT);
    })
})
.catch((err)=>console.log(err))
