const express = require("express");
const router = express.Router();
const {Customer } = require("../models/customerModel");
const {Movie} = require("../models/movieModel");
const {Rental, validateRental} = require("../models/rentalModel");

router.get("/", async(req,res)=>{
    const rental = await Rental.find({});
    if (!rental) return res.status(404).send("there is no rental ");

    res.send(rental);
});
// 623870b8cb0fb33ff14bfdc4

router.get("/:id",async(req,res)=>{
     const rental = await Rental.findById(req.params.id);
     if(!rental) return res.status(404).send("Rental not found");
    res.send(rental);
});



router.post("/", async(req,res)=>{
    const {error} = validateRental(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findById(req.body.movieId)
    if(!movie) return res.status(404).send("there is no Movie found");
    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(400).send("there is no cutomer found");

    const rental = new Rental({
        customer:{
            name: customer.name,
            phone: customer.phone,
        },
        movie:{
            title:movie.title,
            dailyRentalRate: movie.dailyRentalRate,
        },
        rentalFee : movie.dailyRentalRate*10,
    });

    await rental.save();
    res.send(rental);

});

router.patch("/:id",async(req,res)=>{
    
    const rental = await Rental.findByIdAndUpdate({_id:req.params.id},
        {
            $set:
            {
           dateIn: Date.now(),
            },
        },{new:true}
    );
    res.send(rental)
});

router.delete("/:id",async(req,res)=>{
    const rental = await Rental.findByIdAndDelete(req.params.id);
    if(!rental) return res.status(404).send("there is no rental found");
    res.send(rental);
})

module.exports = router;

