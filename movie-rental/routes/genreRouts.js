const express = require("express");
//const Joi = require("joi");
const mongoose = require("mongoose");
const config = require("config");
const router = express.Router();
const { Genre,validateGenre} = require("../models/genreModel");

const app = express();
app.use(express.json());

router.get("/",async(req,res)=>{
  const genres = await Genre.find();
  if(!genres) return res.status(404).send("genre is not there");
    res.send(genres);
});

router.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) return res.status(404).send("genre is not found");
    res.send(genre);
});

router.put("/:id",async(req,res)=>{
    const  {error} = validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    console.log(req.params);
    const genre = await Genre.findByIdAndUpdate(req.params.id,
        {$set:{name: req.body.name}},{new:true});
    if (!genre) return res.status(404).send("genre is not there");
    res.send(genre);
});

router.post("/",async(req ,res)=>{
    console.log(req.body.name );
    const {error} = validateGenre(req.body);
    if (error)return res.status(404).send(error.details[0].message);
    const genre = new Genre({
        name: req.body.name,
    });
    await genre.save();
    res.send(genre);
});

router.delete("/:id", async(req,res)=>{
    const genre = await Genre.findByIdAndDelete(req.params.id)
    if (!genre) return req.status(400).send("genre is not found");
        res.send(genre);
});


module.exports = router;