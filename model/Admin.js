const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');

const AdminSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:2,
    },
    userimage:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpiration:Date
})
AdminSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},"I am admin")
}
module.exports = mongoose.model("Admin",AdminSchema);

