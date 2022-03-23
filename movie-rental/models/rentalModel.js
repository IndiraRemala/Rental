const mongoose = require("mongoose");
const Joi = require("joi");


const rentalSchema = new mongoose.Schema({
    customer:new mongoose.Schema(
        {
    name:{
    type:String,
    required:true,
    minLength:5,
    maxLength:50
    },
    phone:{
    type:String,
    required:true,
    minLength:7,
    maxLength:10
    }
    }),
    movie: {
        required: true,
        type: new mongoose.Schema({
          title: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
          },
          dailyRentalRate: {
            type: Number,
            required: true,
            min: 0,
            max: 1000,
          },
        }),
      },
      dateOut: {
        type: Date,
        default: Date.now,
      },
      dateIn: {
        type : Date,
        default:null
      },
      rentalFee: {
        type: Number,
        min: 0,
        max: 2000,
        required: true,
      },
    });
    const Rental = mongoose.model("Rental",rentalSchema);

    function validateRental(rental) {
        const schema= Joi.object({
            customerId :Joi.objectId().required(),
            movieId:Joi.objectId().required(),
        });

        return schema.validate(rental);
    }

    module.exports.Rental = Rental;
    module.exports.validateRental = validateRental;