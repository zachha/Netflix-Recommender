const path = require('path');
const express = require('express');
const router = express.Router();
const dbc = require('../dbController');

// Default home page of the application
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '../../../views/index.html'));
});

// Fires the title search query based on the input form submitted by the user
router.post('/getSearchedTitles', (req, res) => {
    let formData = req.body.searchTitle;
    dbc.findSearchedTitles(formData, res);
});

// Fires the recommender algorithm to run using the movie submitted by the user
router.post('/getRecommendedTitles', (req, res) => {
    let reccTitle = req.body.reccTitle;
    dbc.findRecommendedTitles(reccTitle, res);
});

// Fires the query that adds the user's true/false accuracy input to the database
router.post('/addAccuracy', (req, res) => {
    let accuracy = req.body.accBool;
    dbc.addAccuracy(accuracy, res);
});

module.exports = router;