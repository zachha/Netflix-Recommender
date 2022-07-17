const express = require("express");

//set PORT
const PORT = process.env.PORT || 8080;

//express initialized
const app = express();

// listening for server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});