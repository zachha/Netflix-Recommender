const fs = require("fs");
const express = require("express");
const path = require("path");
const pgtools = require("pgtools");
const Pool = require('pg').Pool;
require('dotenv').config();


//set PORT
const port = process.env.PORT || 8000;

//express initialized
const app = express();


// connects to our recommenderDB database instance
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
});

app.get("/", (req, res) => {
    res.status(200).send("Netflix Show Recommender");
});

// listening for server
app.listen(port, () => {
  console.log("App listening on PORT " + port);
});