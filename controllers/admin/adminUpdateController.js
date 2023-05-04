const Admin = require("../../model/Admin");
const bcrypt = require('bcrypt');
const {validationResult} = require('express-validator');
exports.updateProfile = async(req,res,next)=>{
    const {name,email,phone} = req.body;
    let errors = validationResult(req);
    if(!errors.isEmpty())  return res.status(422).send({message:"Invalid",vErrors:errors});
    try{
       let admin = await Admin.findById(req.admin._id);
       if(!admin) return res.status(404).send({message:"Admin Not Found"});
       admin.name=name;
       admin.email = email;
       admin.phone = phone;
       admin = await admin.save();
       res.status(200).send({message:'Admin Update Profile Success',admin:{
            name:admin.name,email:admin.email,phone:admin.phone,image:admin.userimage
       }});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}

exports.updatePassword = async(req,res,next)=>{
    const {oldPassword,newPassword} = req.body;
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors});
    try{
        let admin = await Admin.findById(req.admin._id);
        let existPassword = await bcrypt.compare(oldPassword,admin.password);
        if(!existPassword) return res.status(400).send({message:"Your Password is incorrect"});
        admin.password = await bcrypt.hash(newPassword,12);
        admin = await admin.save();
        res.status(200).send({message:"Update Password Success",admin:{
            name:admin.name,email:admin.email,phone:admin.phone,image:admin.userimage
        }})
        
    }catch(err){
        
        res.status(500).send({message:"Something went wrong"});
    }
}