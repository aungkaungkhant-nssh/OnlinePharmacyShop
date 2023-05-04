const Category = require("../../model/Category");
const url = require('url');
const {validationResult} = require('express-validator');


exports.getCategories = async(req,res,next)=>{
        try{
            let categories =  await Category.find({},{__v:0});
            res.status(200).send({message:"Get Categories",categories});
        }catch(err){
            res.status(500).send({message:"Something went wrong"});
        }
}
exports.getAddCategory = (req,res,next)=>{
    res.render('admin/category/add-category',{
        pageTitle:"Add Category",
        sweetAlert:+req.query.action+1500 > Date.now() ? req.query.message:"",
        errorMessage:"",
        isEditing:false,
        breadcrumb:[
            {
                url:"/dashboard",
                name:"Dashboard"
            },
            {
                url:"/category-lists",
                name:"Category_Lists"
            },
            {
                url:"/add-category",
                name:"Add_Category"
            }
        ],
        currentRoute:"/admin/add-category"
    });
}
exports.postAddCategory  = async(req,res,next)=>{
    const {name} =req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()) return  res.status(422).send({message:"Invalid",vErrors:errors});
    try{
        let category = new Category({name});
        await category.save();
        res.status(201).send({message:"Add Category Successfully"});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }

}
exports.deleteCategory = async(req,res,next)=>{
        try{
           let category= await Category.findByIdAndDelete({_id:req.params.id});
           res.status(200).send({message:"Delete Category Success",category});
        }catch(err){
            let error = new Error();
            error.statusCode = 500;
            error.errMessage = err;
            next(error);
        }
     

}

exports.getEditCategory = async(req,res,next)=>{
    let category = await Category.findById(req.params.id);
    res.render('admin/category/add-category',{
        category,
        pageTitle:"Edit Category",
        sweetAlert:+req.query.action+1500 > Date.now() ? req.query.message:"",
        errorMessage:"",
        isEditing:true,
        breadcrumb:[
            {
                url:"/dashboard",
                name:"Dashboard"
            },
            {
                url:"/category-lists",
                name:"Category_Lists"
            },
            {
                url:"/add-category",
                name:"Add_Category"
            }
        ],
        currentRoute:"/admin/add-category"
    })
}
exports.postEditCategory = async(req,res,next)=>{
    let {category_id,name} = req.body;
    try{
        let category = await Category.findById(category_id);
        category.name = name;
        category.save();
        res.redirect(url.format({
            pathname:"/admin/category-lists",
            query:{
                action:Date.now(),
                message:"Update Category Successfully"
            }
        }))
    }catch(err){
        let error = new Error();
        error.statusCode = 500;
        error.errMessage = err;
        next(error);
    }
}