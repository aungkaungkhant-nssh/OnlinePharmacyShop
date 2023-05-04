const fileHelper = require('../../util/file');
const {validationResult} = require('express-validator');
const bcrypt =require('bcrypt');
const Admin = require("../../model/Admin");
const url = require('url');    

exports.getAdminUsers = async (req,res,next)=>{
    try{
        let adminUsers = await Admin.find({},{__v:0,password:0});
        res.status(200).send({message:"Get Admin Users",adminUsers})
    }catch(err){
        return res.status(500).send({message:"Something went wrong"})
    }
   
}

exports.postAddAdminUser = async(req,res,next)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors})
    let {name,email,password,phone,role} = req.body;

    const image =req.files.userimage ? req.files.userimage[0] : "";
    if(!errors.isEmpty()){
       return res.status(422).send({message:"Invalid",vErrors:errors})
    }
   
    try{
        let hashedpassword = await bcrypt.hash(password,12);
        const user = new Admin({name,email,password:hashedpassword,phone,userimage:image.path,role});
        await user.save();
        return res.status(201).send({message:"Admin User Create Success"});
    }catch(err){
        res.status(500).send({message:"Something went wrong"})
    }

}
exports.deleteAdmin= async(req,res,next)=>{
    
    try{
        let admin = await Admin.findByIdAndDelete({_id:req.params.id});
        fileHelper.deleteFile(admin.userimage);
        if(!admin) return res.status(404).send({messag:"Admin not found"});
        res.status(200).send({message:"Admin Delete Success",admin})
       
    }catch(err){
        
       res.status(500).send({message:"Something went wrong"})
    }
  
}

exports.updateAdminRole = async(req,res,next)=>{
   
    const {role}=req.body;
    console.log(req.body)
    try{
        let admin = await Admin.findById(req.params.id);
        if(!admin) return res.status(404).send({message:"Admin Not Found"})
        admin.role = role;
        admin = await admin.save();
        return res.status(200).send({message:"Update Admin role success",admin:{
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            phone:admin.phone,
            userimage:admin.userimage,
            role:admin.role
        }})
    }catch(err){
       console.log(err)
       return res.status(500).send({message:"Something went wrong"});
    }
}
exports.getAdminProfile = async (req,res,next)=>{
    res.render('admin/admin-users/profile',{
        admin:req.session.admin,
        pageTitle:"Profile"
    })
}
exports.postAdminUserUpdate = async (req,res,next)=>{
    const {name,email,phone,id} =req.body;
    try{
        let admin = await Admin.findById(id);
        admin.name = name;
        admin.email = email;
        admin.phone = phone;
        admin = await admin.save();
        req.session.admin={...req.session.admin,name,email,phone}
        res.redirect(url.format({
            pathname:"/admin/admin-lists",
            query:{
                action:Date.now(),
                adminId:id,
                message:"Update Admin User Successfully"
            }
        }))
       
    }catch(err){
        let  error = new Error(err);
        error.statusCode = 500;
        error.errMessage = "Something went wrong"
        next(error);
    }
    
}
exports.getChangeProfile = async (req,res,next)=>{
    let {id} =req.body;
    let image = req.files.userimage[0];
    try{
        let admin = await Admin.findById(id);
        fileHelper.deleteFile(admin.userimage);
        admin.userimage = image.path;
        await admin.save(); 
        req.session.admin={...req.session.admin,image:image.path} 
        return res.render('admin/admin-users/profile',{
            admin:req.session.admin,
            pageTitle:"Profile"
        })
    }catch(err){
        let  error = new Error(err);
        error.statusCode = 500;
        error.errMessage = "Something went wrong"
        next(error);
    }
}
