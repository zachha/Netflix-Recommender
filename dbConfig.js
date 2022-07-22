const fs = require("fs");
const fastcsv = require("fast-csv");
const pgtools = require("pgtools");
const Pool = require('pg').Pool;
require('dotenv').config();

/*
// Initial database creation and configuration
const config = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
};

pgtools.createdb(config, process.env.PG_DATABASE, function(err, res) {
    if (err) {
        console.error(err);
        process.exit(-1);
    }
    console.log(res);
});
*/


const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
});

// reads cleaned .csv file and fills database with data
const query = "INSERT INTO titles (title_id, title, type, description, runtime, genres, seasons, imdb_score, imdb_votes, tmdb_score) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
let stream = fs.createReadStream('rawTitles_cleaned.csv');
let rawData = [];
let rawStream = fastcsv
    .parse()
    .on("data", function(data) {
        rawData.push(data);
    })
    .on("end", function() {
        rawData.shift();
        pool.connect((err, client, done) => {
            if (err) throw err;
            try {
                rawData.forEach(row => {
                    client.query(query, row, (err, res) => {
                        if (err) {
                            console.log(err.stack);
                        } else {
                            console.log("INSERTED: " + res.rowCount + "ROW:", row);
                        }
                    });
                });
            } finally {
                done();
            }
        });
    });
stream.pipe(rawStream);
