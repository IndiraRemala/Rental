// const { default: mongoose } = require("mongoose")

const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,

    },
    email:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30,

    },
    password:{
        type:String,
        required:true,
        minlength:7,
        maxlength:30,

    },
    isAdmin:{
        type:Boolean,
        default:false
    },
});

const User = mongoose.model("User",userSchema);

function validateUser(user){
   const schema = Joi.object({
    name:Joi.string().min(3).max(30).required(),
    email:Joi.string().min(20).max(40).required(),
    password:Joi.string().min(7).max(30).required(),
    isAdmin:Joi.boolean(), 
   });
   return schema.validate(user);
}


module.exports.User = User;
module.exports.validateUser = validateUser;
