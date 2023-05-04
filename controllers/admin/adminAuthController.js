const bcrypt =require('bcrypt');
const Admin = require("../../model/Admin");
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');

const transpoter =nodemailer.createTransport({
    service:"gmail",
   
    auth:{
        user:"aungkaungkhantakk123321@gmail.com",
        pass:"jsmbplaxusdehsxn"
    }
});

exports.getAdminLogin = (req,res,next)=>{
    res.render('admin/auth/login',{
        errorMessage:"",
        sweetAlert:"",  
    });
}
exports.getNewPassword = async (req,res,next)=>{
    let token =req.params.token;
    try{
        let admin = await Admin.findOne({resetToken:token});
        if(!admin){
            console.log("No Admin")
            return
        }
        res.render('admin/auth/new-password',{
            pageTitle:'New Password',
            passwordToken:token,
            userId :admin._id
        });
    }catch(err){
        let  error = new Error(err);
        error.statusCode = 500;
        error.errMessage = "Something went wrong"
        next(error);
    }
   

}
exports.postNewPassword = async (req,res,next)=>{
    let {id,passwordToken,password,confirmPassword} = req.body;
    
    if(password !==confirmPassword){
        return 
    }
    try{
        let admin = await Admin.findOne({_id:id,resetToken:passwordToken,resetTokenExpiration:{$gt:Date.now()}})
        if(!admin) return console.log("Not Found Admin");
        let hashedpassword = await bcrypt.hash(password,12);
        admin.password = hashedpassword;
        admin.resetToken = undefined;
        admin.resetTokenExpiration = undefined;
        await admin.save();
        return res.redirect('/admin/login');
    }catch(err){
        let  error = new Error(err);
        error.statusCode = 500;
        error.errMessage = "Something went wrong"
        next(error);
    }
}
exports.postAdminLogout = (req,res,next)=>{
    req.session.destroy((err)=>{
        if(err) console.log(err);
        res.redirect('/admin/login')
    })
}
exports.postAdminLogin =async (req,res,next)=>{
     let errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(422).send({message:"Invalid",vErrors:errors})
    }
     let {email,password} =req.body;
     try{
        let admin = await Admin.findOne({email});
        if(!admin) return res.status(422).send({message:"You Email doesn't exist"});  
        let existPassword = await bcrypt.compare(password,admin.password);
        if(!existPassword) return res.status(422).send({message:"Your Password Incorrect"});

        let token = admin.generateToken();
        res.status(200).send({
            name:admin.name,
            email:admin.email,
            phone:admin.phone,
            image:admin.userimage,
            role : admin.role,
            token
        })
     }catch(err){
      
       res.status(500).send({message:"Something went wrong"});
     }
    
   
}
exports.postResetPassword= async (req,res,next)=>{
    crypto.randomBytes(32,async(err,buffer)=>{
        if(err) return res.redirect('/admin/login');
        let token = buffer.toString("hex");
        try{
            let admin = await Admin.findOne({email:req.body.email});
            if(!admin) {
                res.render('admin/auth/login',{
                    errorMessage:"Admin Not Found",
                    sweetAlert:"",  
                });
            };
            admin.resetToken = token;
            admin.resetTokenExpiration = Date.now()+360000;
            await admin.save();
            res.render('admin/auth/login',{
                errorMessage:"",
                sweetAlert:"Please check Your Email",  
            });
            transpoter.sendMail({
                from:"aungkaungkhantakk123321@gmail.com",
                to:req.body.email,
                subject:"Password Reset",
                html:`
                    <p>You requested a password reset</p>
                    <p>Click here <a href='http://localhost:8080/admin/new-password/${admin.resetToken}'>Link</a>
                    </p>
                `
            })
        }catch(err){
            let  error = new Error(err);
            error.statusCode = 500;
            error.errMessage = "Something went wrong"
            next(error);
        }
        
    })
}