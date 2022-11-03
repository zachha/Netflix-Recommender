const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB schema for the Titles collection
let titleSchema = new Schema({
    id: String,
    title: String,
    type: String,
    description: String,
    runtime: String,
    genre: String,
    genres: [{ type: String }],
    seasons: String,
    imdb_score: String,
    imdb_votes: String,
    tmdb_score: String
});

const Title = mongoose.model("titles", titleSchema);
module.exports = Title;