const User= require('../../model/User');
const fileHelper = require('../../util/file');
const bcrypt =require('bcrypt');
const {validationResult} = require('express-validator');
const Order = require('../../model/Order');

exports.getUsers = async(req,res,next)=>{
    try{
        let users =  await User.find({},{password:0,__v:0});
        res.status(200).send({message:"Get Users",users});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}
exports.postAddUser = async(req,res,next)=>{
    const {name,email,phone,password,image} = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors});
    
    try{
        const hashedpassword = await bcrypt.hash(password,12);
        let user = new User({name,email,phone,password:hashedpassword,image});
        user = await user.save();
        res.status(201).send({message:"Create User success"});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}

exports.deleteUser =async (req,res,next)=>{
    try{
        let user = await User.findByIdAndDelete({_id:req.params.id});
        await Order.deleteOne({userId:user._id});
        fileHelper.deleteFile(user.image);
        if(!user) return res.status(404).send({message:"User Not found"});
        res.status(200).send({message:"Delete User Success",user});
    }catch(err){
        let error = new Error(err);
        error.statusCode = 500;
        
    }
}

