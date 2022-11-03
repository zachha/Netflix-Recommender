const fastcsv = require("fast-csv");
const mongodb = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const fs = require("fs");
require('dotenv').config();
const Title = require('./models/Title.js');

// INSERT DATABASE NAME HERE 
let dbName = "movies"
// INSERT DATABASE CONNECTION STRING HERE
let mongoURI = process.env.MONGO_URI;

// Uses the streaming functionality and the fast-csv package to read our cleaned .csv dataset into the mongoDB database
let stream = fs.createReadStream("rawTitles_cleaned.csv");
let csvData = [];
let csvStream = fastcsv.parse()
                .on("data", function(data) {
                    csvData.push({
                        id: data[0],
                        title: data[1],
                        type: data[2],
                        description: data[3],
                        runtime: data[4],
                        genre: data[5],
                        seasons: data[6],
                        imdb_score: data[7],
                        imdb_votes: data[8],
                        tmdb_score: data[9]
                    });
                })
                .on("end", function() {
                    csvData.shift();
                    mongodb.connect( mongoURI, { 
                        useNewUrlParser: true,
                        useUnifiedTopology: true
                    }, (err, client) => {
                        if (err) throw err;
                        client.db(dbName)
                        .collection("titles")
                        .insertMany(csvData, (err, res) => {
                            if (err) throw err;
                            console.log(`Inserted: ${res.insertedCount} rows`);
                            client.close();
                        });
                    });
                });
stream.pipe(csvStream);

// Async function waits for the mongodb connection to occur before attempting to update data types
async function main() {
    await mongoose.connect(mongoURI).then( () => {
        updateDataTypes();
    });
};


// Updates the genres field by pushing every genre to the mongodb array 
function updateDataTypes() {
    Title.find({}).then( async allElements => {
    Title.syncIndexes();
    for await (const [i, element] of allElements.entries()) {
        // Splices the array data that was input by the csv in the wrong format and reformats into an array
        let reccedGenres = element.genre.split(/\s(?=')/);
        let parsedGenres = reccedGenres.map( ele => {
            return ele.replace("'", "").replace("[", "").replace(",", "").replace("]", "").replace("'", "");
        });
        let tempArray = parsedGenres;

        Title.updateOne({"title": element.title},
            { "$push": { "genres": { "$each": tempArray}}}
        ).then( () => {
            if (i === allElements.length - 1) {
                console.log("all element types updated");
                console.log("Database is fully configured!");
            } else {
                console.log("updating array: " + element.id);
            }
        }).catch( (err) => {
            console.log(err);
        });
    };
}).catch(err => {
    console.log("error with database input: " + err);
});
};

// Timeout function starts the updateDataType function after 4s so the database has time to be initialized first
MyTimeout = setTimeout( () => {
    main();
}, 4000);

