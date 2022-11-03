const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// MongoDB schema for the Accuracy collection
let accuracySchema = new Schema({
    accurate: String
});

const Accuracy = mongoose.model("accuracy", accuracySchema, "accuracy");
module.exports = Accuracy;