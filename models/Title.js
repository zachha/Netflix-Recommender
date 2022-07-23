const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let titleSchema = new Schema({
    id: String,
    title: String,
    type: String,
    description: String,
    runtime: String,
    genres: String,
    seasons: String,
    imdb_score: Number,
    imdb_votes: Number,
    tmdb_score: Number
});

const Title = mongoose.model("titles", titleSchema);
module.exports = Title;