const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let accuracySchema = new Schema({
    accurate: Boolean
});

const Accuracy = mongoose.model("accuracy", accuracySchema);
module.exports = Accuracy;