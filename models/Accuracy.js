const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accuracySchema = new Schema({
    accurate: String
});

const Accuracy = mongoose.model("accuracy", accuracySchema, "accuracy");
module.exports = Accuracy;