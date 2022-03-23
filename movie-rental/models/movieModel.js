const mongoose =  require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const {genreSchema} = require("./genreModel");



const movieSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        minlength:5,
        maxlength :255,  
    },
    dailyRentalRate:{
        type:String,
        required: true,
        minlength:0,
        maxlength :255,

    },
    numberInStock:{
        type:Number,
        required: true,
        minlength:0,
        maxlength :255,
    },
    genre:{
        type:genreSchema,
        required:true,
    },

});

function validateMovie(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        genreId: Joi.objectId().required(),
      });
      return schema.validate(movie);
};

const Movie = mongoose.model("movies", movieSchema);
module.exports.Movie = Movie;
module.exports.validateMovie = validateMovie;
