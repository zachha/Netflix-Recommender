const express = require("express");
const path = require("path");
const pgtools = require("pgtools");


//set PORT
const port = process.env.PORT || 8000;

//express initialized
const app = express();

const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};

pgtools.createdb(config, "RecommenderDB", function(err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(res);
});

app.get("/", (req, res) => {
    res.status(200).send("Netflix Show Recommender");
});

// listening for server
app.listen(port, () => {
  console.log("App listening on PORT " + port);
});