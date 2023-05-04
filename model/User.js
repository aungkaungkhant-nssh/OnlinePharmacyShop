const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const UserSchema = new Schema({
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
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    resetToken:{type:String},
    resetTokenExpiration:{type:String}
})
UserSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},"love you nan su san htike")
}
module.exports = mongoose.model("User",UserSchema);