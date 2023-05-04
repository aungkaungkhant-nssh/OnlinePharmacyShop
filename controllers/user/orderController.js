const Order = require("../../model/Order");
const Product = require('../../model/Product');
exports.getOrders = async(req,res,next)=>{
    try{
        let orders =  await Order.find({userId:req.user._id}).populate("orderItems.product");
        res.status(201).send({message:"Get Orders",orders})
    }catch(err){
        return res.status(500).send({message:"Something went wrong"})
    }
 
  
}

exports.postOrder =async (req,res,next)=>{
    const {orderItems,shipping,medicineTotalPrice,discountPrice,totalAmount} = req.body;
    try{
        let order = new Order({
            orderItems,
            shipping,
            medicineTotalPrice,
            discountPrice,
            totalAmount,
            userId:req.user._id
        });
        order = await order.save();
       
        orderItems.forEach(async(o)=>{
            let product= await Product.findById(o.product);
             product.numberInstock -=o.qty;
             await product.save();
        })
        res.status(201).send({message:"Order Create Successfully",order})
    }catch(err){
        return res.status(500).send({message:"Something went wrong"})
    }
   
}
exports.getOrder = async (req,res,next)=>{
    let {id} = req.params;
    try{
        let order =  await Order.findById(id).populate('orderItems.product');
        if(!order) return res.status(400).send({message:"Order Not Found"});
        return res.status(200).send({message:"Get Order",order});
    }catch(err){
        console.log(err)
        return res.status(500).send({message:"Something went wrong"})
    }
}

exports.paymentOrderUpdate = async (req,res,next)=>{
    let {id} = req.params;
    try{
        let order = await Order.findById(id).populate('orderItems.product');
        order.isPaid =true;
        order.paidAt = new Date();
        order =await order.save();
        return res.status(200).send({message:"Your payment is successfully",order});
    }catch(err){
        return res.status(500).send({message:"Something went wrong"})
    }
}

