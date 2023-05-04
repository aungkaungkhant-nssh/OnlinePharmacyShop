const Admin = require('../../model/Admin');
const User = require('../../model/User');
const Product = require('../../model/Product');
const Order = require('../../model/Order');
exports.getDashboardData = async(req,res,next)=>{
    try{
        let user = await User.aggregate([
            { $group: { _id: null, numUsers: { $sum: 1 } } },
            { $project: { _id: 0 } }
        ])
        let admin = await Admin.aggregate([
            {$group:{_id:null,numAdmin:{$sum:1}}},
            {$project:{_id:0}}
        ])
        let products = await Product.aggregate([
            {$group:{_id:null,numProducts:{$sum:1}}},
            {$project:{_id:0}}
        ])
        let order = await Order.aggregate([
            {$group:{_id:null,numOrder:{$sum:1}}},
            {$project:{_id:0}}
        ]);
        let dailyOrder = await Order.aggregate([
            {
                $group:{
                    _id:{$dateToString:{format:'%Y-%m-%d',date:"$createdAt"}},
                    orders:{$sum:1},
                    sales:{$sum:"$totalAmount"}
                }
            }
        ])
        let latestOrder = await Order.find({}).populate("userId").sort({"createdAt":-1}).limit(3);
       
        return res.status(200).send({dashboard:{user,admin,products,order,dailyOrder,latestOrder}});
    }catch(err){
      
        return res.status(500).send({message:"Something went wrong"})
    }
}