const User = require('../../model/User');
const {validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
exports.putUpdateProfile = async(req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty())  return res.status(422).send({message:"Invalid",vErrors:errors});
    const {name,email,phone} = req.body;
    try{
        let user = await User.findById(req.user._id);
        user.name = name;
        user.email = email;
        user.phone = phone;
        user = await user.save();
        res.status(200).send({message:"Update Profile Success",user:{
            name:user.name,email:user.email,phone:user.phone,image:user.image
        }});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}

exports.putUpdatePassword = async(req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors});
    const {oldPassword,newPassword} = req.body;
    try{
        let user = await User.findById(req.user._id);
        let existPassword = await bcrypt.compare(oldPassword,user.password);
        if(!existPassword) return res.status(400).send({message:"Your Password is incorrect"});
        user.password = await bcrypt.hash(newPassword,12);
        user = await user.save();
        res.status(200).send({message:"Update Password Success",user:{
            name:user.name,email:user.email,phone:user.phone,image:user.image
        }})
        
    }catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong"});
    }
}