const mongoose =  require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:3,
        maxlength :30,  
    },
    phone:{
        type:String,
        required: true,
        minlength:7,
        maxlength:10,
    },
    isGold :{
        type:Boolean,
        default:false,
    }
});

const Customer = mongoose.model("Customer",customerSchema);

function validateCustomer(customer){
    const schema= Joi.object({
        name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().min(7).max(9).required(),
        isGold: Joi.boolean().required(),
    });
    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;