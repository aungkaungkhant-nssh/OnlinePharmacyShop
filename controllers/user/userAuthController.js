const {validationResult} = require('express-validator');

const User = require('../../model/User');
const crypto = require('crypto');
const bcrypt =require('bcrypt');
const nodemailer = require('nodemailer');

const transpoter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"aungkaungkhantakk123321@gmail.com",
        pass:"jsmbplaxusdehsxn"
    }
  
})


exports.postRegister =  async(req,res,next)=>{
    
    let errors = validationResult(req);
   
    const {name,email,phone,password,image} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).send({message:"Invalid",vErrors:errors})
    }
    try{
        let existEmail = await User.findOne({email});
        let existPhone = await User.findOne({phone});
        if(existEmail) return res.status(400).json({message:"Your Email is aleady exist"})
           
        if(existPhone)return res.status(400).json({message:"Your Phone is aleady exist"})
        
       
        let hashedPassword = await bcrypt.hash(password,12);
        let user = new User({name,email,phone,password:hashedPassword,image});
        user = await user.save();
        res.status(200).send({
            name:user.name,
            email:user.email,
            phone:user.phone,
            image:user.image,
            
        })
    }catch(err){
        return res.status(500).send({message:"Something went wrong"})
    }
   
  
}
exports.postLogin = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({message:"Invalid",vErrors:errors})
    }
    try{
        let user = await User.findOne({email:req.body.email});
        if(!user) return res.status(400).send({message:"Email address doesn't exist"});
    
        let isValid= await bcrypt.compare(req.body.password,user.password);
        if(!isValid) return res.status(400).send({message:"Invalid Password"});
        let token =user.generateToken();
        return res.status(200).send({
            name:user.name,
            email:user.email,
            phone:user.phone,
            image:user.image,
            token
        })
    }catch(err){
        return res.status(500).send({message:err.message})
    }
    
    
}
exports.postResetPassword = async(req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).send({message:"Invalid",vErrors:errors})
    }
    crypto.randomBytes(32,async(err,buffer)=>{
        if(err) return res.status(500).send({message:"Something went wrong"});
        try{
            let user = await User.findOne({email:req.body.email});
            if(!user)return res.status(404).send({message:"Your email address doesn't exist"});
            const token = buffer.toString("hex");
            user.resetToken = token;
            user.resetTokenExpiration=Date.now()+360000;
            await user.save();
            transpoter.sendMail({
                from:"aungkaungkhantakk123321@gmail.com",
                to:req.body.email,
                subject:"Password Reset",
                html:`
                    <p>You requested a password reset</p>
                    <p>Click there <a href="http://localhost:3000/reset/${token}">Link</a></p>
                `
            })
            res.status(200).send({message:"Please check your email"})
        }catch(err){
            console.log(err)
            res.status(500).send({message:"Something went wrong"});
        }
        
    })
}
exports.getUserDataFromToken = async(req,res,next)=>{
    try{
        let user = await User.findOne({resetToken:req.params.token,resetTokenExpiration:{$gt:Date.now()}},{password:0});
  
        if(!user) return res.status(400).send({message:"Expire Token"});
        return res.status(200).send({message:"Get User From Token success",user});
    }catch(err){
        res.status(500).send({message:"Someting went wrong"});
    }
}
exports.resetNewPassword = async(req,res,next)=>{
    const errors = validationResult(req);
    
    if(!errors.isEmpty()){
        return res.status(422).send({message:"Invalid",vErrors:errors})
    }
    const {token,userId,password} = req.body;
    try{
        let user = await User.findOne({resetToken:token,_id:userId},{password:0});
        if(!user) return res.status(404).send({message:"User Not Found"});
        let hashedPassword = await bcrypt.hash(password,12);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).send({message:"Reset Your Password Success",user});
    }catch(err){
        res.status(500).send({message:"Someting went wrong"});
    }
}

