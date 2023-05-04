const Product = require('../../model/Product');
const Category = require('../../model/Category');
const {validationResult} = require('express-validator');

exports.getProducts =async(req,res)=>{
    let perpage = 8;
    let currentPage = +req.query.page || 1;
    let medicine = req.query.medicine || "";
    let categoryId = req.query.categoryId || "";
    let medicineFilter = medicine ? {name:{$regex:medicine,$options:'i'}} :{};
    let categoryFilter = categoryId ? {categoryId}:{};
    try{
        let productsCount = await Product.countDocuments();
        let totalPage = Math.ceil(productsCount/perpage);
        let products = await Product
                               .find(
                                    {
                                    ...medicineFilter,
                                    ...categoryFilter
                                    },
                                )
                               .skip((currentPage-1)*perpage)
                               .limit(perpage);
        let categories = await Category.find();
        return res.status(200).send({
            message:"Get Products",
            products,
            categories,
            totalPage,
            currentPage
        })
    }catch(err){

        return res.status(500).send({message:"Something went wrong"})
    }
   
}
exports.postReviews = async(req,res,next)=>{
    const {id} = req.params;
    const reviews = {name:req.body.name,image:req.body.image,comment:req.body.comment,rating:Number(req.body.rating)}
    try{
        let product =await Product.findById(id);
        if(product.reviews.find((r)=>r.name === req.body.name)) return res.status(400).send({message:"You already submitted review"})
        product.reviews.push(reviews);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a,c)=>c.rating+a,0)/product.reviews.length;
        product = await product.save();
        res.status(200).send({message:"Product Review Success",product});
    }catch(err){
        return res.status(500).send({message:"Someting went wrong"});
    }
}
exports.getProduct = async(req,res,next)=>{
    const productId = req.params.id;
    let product = await Product.findById(productId);
    res.status(200).send({message:"Get Product",product})
}
//[0,1,2,3,4]