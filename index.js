const mongoose = require('mongoose');
const fs = require("fs");
const express = require("express");
const path = require("path");
require('dotenv').config();

// db connections
main().catch(err => console.log(err));
async function main() {
    // Database connection string goes here
    await mongoose.connect(process.env.MONGO_URI);
}


//  Connection announced and logged
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})



//set PORT
const port = process.env.PORT || 8000;

//express initialized
const app = express();
// pathing directory placed in the public folder with the public facing files
app.use(express.static('public'));
// used to handle form submissions
app.use(express.json());

// api routing
const router = require("./controllers/routes/htmlRoutes.js");
app.use(router);


// listening for server
app.listen(port, () => {
  console.log("App listening on PORT " + port);
});
