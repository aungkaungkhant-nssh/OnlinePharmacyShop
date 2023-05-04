const Order = require("../../model/Order");

exports.getOrders = async(req,res,next)=>{
    try{
        let orders = await Order.find({}).populate("userId").sort({"createdAt":1});
        res.status(200).send({message:"Order Get Success",orders});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}
exports.putDelivered = async(req,res,next)=>{
    try{
        let order = await Order.findById(req.params.id).populate('orderItems.product');
        order.isDelivered=true;
        order.deliveredAt = new Date();
        order.status = "Delivered";
        order = await order.save();
        console.log(order)
        res.status(200).send({message:"Order Delivered Success",order});
    }catch(err){
        res.status(500).send({message:"Something went wrong"});
    }
}

exports.deleteOrder = async(req,res,next)=>{
    let {id} = req.params;
    try{
        let order = await Order.findByIdAndDelete({_id:id});
        if(!order) return res.status(404).send({message:"Order not found"});
        res.status(200).send({message:"Order delete Success",order})
    }catch(err){
        res.status(500).send({message:"Someting went wrong"});
    }
}