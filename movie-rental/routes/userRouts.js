const express = require("express");
const { Movie } = require("../models/movieModel");
const router = express.Router();
const {User,validateUser} = require("../models/userModel");

router.post("/", async(req,res)=>{
    const {error} =  validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = new User({
        name :req.body.name,
        email : req.body.email,
        password: req.body.password,
        isAdmin : req.body.isAdmin,
    });
    await user.save();
    res.send(user);
});

router.get("/",async(req,res)=>{
    const users = await User.find({});
    if(!users) return res.status(404).send("there is no user found");
    res.send(users);
});
router.get("/:id",async(req,res)=>{
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send("there is no user found");
    res.send(user);
});

router.put("/:id",async(req,res)=>{
    console.log("hey");
 const {error} = validateUser(req.body);
 if(error) return res.status(400).send(error.details[0].message);
console.log("hello");
 const user = await User.findByIdAndUpdate(req.params.id,
    {
        $set:{
     name:req.body.name,
     email:req.body.email,
     password:req.body.password,
     isAdmin:req.body.isAdmin
        },
 },
 {new:true});
res.send(user)
 
});

router.delete("/:id",async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id);
    if(!user) return res.status(404).send("there is no user found");
    res.send(user);
});




module.exports = router;