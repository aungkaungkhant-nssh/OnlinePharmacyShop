const Product = require("../../model/Product");
const fileHelper = require('../../util/file');
const {validationResult} = require('express-validator');
const url = require('url');    
const Category = require("../../model/Category");


exports.getDashboard = (req,res,next)=>{
    res.render("admin/products/dashboard",{
        breadcrumb:[],  
        currentRoute:"/admin/dashboard"
    })
}
exports.getLowerNumberInstock = async(req,res,next)=>{
    try{
        let product = await Product.find({numberInstock:{$lt:3}});
        if(!product) return res.status(200).send({message:"Get LowerNumber Instock",product:[]});
        res.status(200).send({message:"Get LowerNumber Instock",product});
    }catch(err){
        res.status(500).send({messge:"Something went wrong"});
    }
}
exports.postAddProduct = async(req,res,next)=>{
    
    const {name,price,description,categoryId,numberInstock,image}= req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors});
    let categories= await Category.find({_id:categoryId});
    if(!categories) return res.status(404).send({message:"Category Not found"});
   
    try{
     
        let product = new Product({name,price,image,description,categoryId,numberInstock});
        product =await product.save();
     
        res.status(201).send({message:"Proudct Create Success",product})
    }catch(err){
        console.log(err)
        return res.status(500).send({message:"Something went wrong"})
    }
    
}
exports.getProducts = async(req,res,next)=>{
    try{
        let products =  await Product.find({},{__v:0});
        let categories = await Category.find();
        res.status(200).send({message:"Get Products",products,categories});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
     
}
exports.deleteProduct = async (req,res,next)=>{
    try{
        let product = await Product.findByIdAndDelete({_id:req.params.id});
        fileHelper.deleteFile(product.image);
        if(!product) return res.status(404).send({message:"Product not found"});
        res.status(200).send({message:"Delete Product Success",product});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}
exports.getEditProduct = async (req,res,next)=>{
    try{
        let categories= await Category.find();
        let product = await Product.findById(req.params.id);
        res.render("admin/products/add-product",{
            categories,
            sweetAlert:"",
            errorMessage:"",
            breadcrumb:[
                {
                    url:"/dashboard",
                    name:"Dashboard"
                },
                {
                    url:"/product-lists",
                    name:"Product_Lists"
                },
                {
                    url:"/add-product",
                    name:"Add_Product"
                }
            ],
            product,
            isEditing:true,
            hasError:false,
            validationsErrors:[],
            currentRoute:"/admin/add-product"
        });
    }catch(err){
        let  error = new Error(err);
        error.statusCode = 500;
        error.errMessage="Someting went wrong"
        next(error);
    }
    
}
exports.updateProduct =async(req,res,next)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()) return res.status(422).send({message:"Invalid",vErrors:errors});
     let {name,price,description,categoryId,numberInstock,image} = req.body;
     
     let product = await Product.findById(req.params.id);
  
     try{
       
        if(!product) return  res.status(404).send({message:"Product not found"});
        if(image){
            product.image = image;
        }
        product.image = product.image;
        product.name = name;
        product.price = price;
        product.description = description;
        product.categoryId= categoryId;
        product.numberInstock= numberInstock;
        product=await product.save();
        res.status(200).send({message:"Product Update success",product});
      
     }catch(err){
        console.log(err)
        res.status(500).send({message:"Something went wrong"});
     }
    


   
}
