const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderItems:[
        {
            qty:{required:true,type:Number},
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Product',
                required:true
            }
        }
    ],
    shipping:{
        address:{required:true,type:String},
        city:{required:true,type:String},
        phone:{required:true,type:Number},
        taxi:{default:false,type:Boolean},
        fullName:{required:true,type:String},
        payment :{required:true,type:String}
    },
    medicineTotalPrice:{required:true,type:Number},
    discountPrice:{required:true,type:Number},
    totalAmount : {required:true,type:Number},
    isDelivered:{default:false,type:Boolean},
    deliveredAt:{type:Date},
    isPaid:{default:false,type:Boolean},
    status:{default:"pending",type:String},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    paidAt:{type:Date}

},{
    timestamps:true
})
module.exports =mongoose.model('Order',OrderSchema);