const fs = require('fs');

exports.deleteFile = (imagePath)=>{
    fs.unlink(imagePath,(err)=>{
        if(err) console.log(err)
    })
}