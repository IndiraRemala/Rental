const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Joi = require("joi");
const router  = express.Router();
const {Customer,validateCustomer} = require("../models/customerModel");

router.get("/", async(req,res)=>{
    const customers = await Customer.find();
    console.log(customers);
    if(!customers) return res.status(400).send("custoemr is not there");
    res.send(customers);
});

router.get("/:id",async(req,res)=>{
    const customer =await Customer.findById(req.params.id);
    console.log(customer);
    if(!customer) return res.status(404).send("No customer is found")
     res.send(customer);
});


router.post("/",async(req,res)=>{
    const {error} = validateCustomer(req.body);
    if (error)return res.status(404).send(error.details[0].message);
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });
    await customer.save();
    res.send(customer);
});

router.put("/:id",async(req,res)=>{
    const  {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log(req.params);
    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {$set:
        {name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold}},{new:true});
    if(!customer) return res.status(404).send("there is no customer");
    res.send(customer);
});

router.delete("/:id", async(req,res)=>{ 
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if(!customer) return res.status(400).send("No customer found");
    res.send(customer);
})

module.exports = router;