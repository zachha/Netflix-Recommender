const mongoose = require('mongoose');
const fs = require("fs");
const express = require("express");
const path = require("path");
require('dotenv').config();

// Db connections
async function main() {
    // DATABASE CONNECTION STRING GOES HERE
    await mongoose.connect(process.env.MONGO_URI);
}
main().catch(err => console.log(err));

// Connection announced and logged
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
})

// Set PORT
const port = process.env.PORT || 8000;

// Express initialized
const app = express();
// Pathing directory placed in the public folder with the public facing files
app.use(express.static('public'));
// Used to handle form submissions
app.use(express.json());

// API routing
const router = require("./controllers/routes/htmlRoutes.js");
app.use(router);


// Listening for server
app.listen(port, () => {
  console.log("App listening on PORT " + port);
});
