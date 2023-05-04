const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const reviewSchema = new mongoose.Schema({
    name:{type:String},
    image:{type:String},
    comment:{type:String},
    rating:{type:Number}
},{timestamps:true})
const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    numberInstock:{
        type:Number,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    reviews:[reviewSchema]
})

module.exports = mongoose.model("Product",ProductSchema);