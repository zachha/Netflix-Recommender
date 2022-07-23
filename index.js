const mongoose = require('mongoose');
const fs = require("fs");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}


// Test connection
mongoose.connection.once('open', function () {
  console.log('MongoDB database connection established successfully')
  console.log(mongoose.connection.name);
})



//set PORT
const port = process.env.PORT || 8000;

//express initialized
const app = express();
app.use(express.static('public'));
// used to handle form submissions
app.use(express.json());


const router = require("./controllers/routes/htmlRoutes.js");
app.use(router);


// listening for server
app.listen(port, () => {
  console.log("App listening on PORT " + port);
});
