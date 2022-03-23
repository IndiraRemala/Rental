const express = require("express");
const { Genre } = require("../models/genreModel");
const router = express.Router();
const {Movie, validateMovie} = require("../models/movieModel");

router.get("/", async(req,res)=>{
    const movies = await Movie.find({});
    if(!movies) return res.status(404).send("Movies not found");
    res.send(movies);

});

router.get("/:id", async(req,res)=>{
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("Movie not found");
    res.send(movie);
})

router.post("/", async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("please chech the genreId");
    const movie = new Movie ({
        title: req.body.title,
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStock: req.body.numberInStock,
        genre:{
            name: genre.name,
            _id: genre._id,
        },
    });
   await movie.save();
   res.send(movie);
});

router.put("/:id",async(req,res)=>{
    const {error} = validateMovie(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("there is no genre");

    const movie = await Movie.findByIdAndUpdate(req.params.id,
        {
            $set:
            {
             title: req.body.title,
             genre:{
                name: genre.name,
                _id: genre._id,
                 },
             dailyRentalRate: req.body.dailyRentalRate,
             numberInStock: req.body.numberInStock,
             
            },
        },{new:true}
        
        );
        if(!movie) return res.send("there is no movie to update");
        res.send(movie);

});
router.delete("/:id", async(req,res)=>{
    const movie = await Movie.findByIdAndDelete(req.params.id)
    if (!movie) return req.status.send("Movie is not found");
        res.send(movie);
})

module.exports = router;