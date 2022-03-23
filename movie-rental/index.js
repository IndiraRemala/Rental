const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const db = config.get("db");
const genreRouter = require("./routes/genreRouts");
const customerRouter = require("./routes/customerRouts");
const movieRouter = require("./routes/movieRouts");
const rentalRouts = require("./routes/rentalRouts");
const userRouts = require("./routes/userRouts");


const app = express();
app.use(express.json());
mongoose.connect(db)
 .then(()=> console.log(`connected to the database ${db}`))
 .catch((err)=> console.log(`not connected` + err));

app.use('/api/genres',genreRouter);
app.use('/api/customers',customerRouter);
app.use('/api/movies',movieRouter);
app.use('/api/rentals',rentalRouts);
app.use('/api/users',userRouts);
const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`listen to the port ${port}`);
});


