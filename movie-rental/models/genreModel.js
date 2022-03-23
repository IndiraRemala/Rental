const mongoose = require("mongoose");
const Joi = require("joi");



const genreSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength:3,
        maxlength :30,  
    },
});

const Genre = mongoose.model("Genre",genreSchema);

function validateGenre(genre){
    const schema= Joi.object({
        name: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(genre);
}

module.exports.validateGenre = validateGenre;
module.exports.Genre = Genre;
module.exports.genreSchema = genreSchema;
