const path = require('path');
const express = require('express');
const router = express.Router();
const dbc = require('../dbController');

// default home page of the application
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname + '../../../index.html'));
});

// fires the title search query based on the input form submitted by the user
router.post('/getSearchedTitles', (req, res) => {
    let formData = req.body.searchTitle;
    dbc.findSearchedTitles(formData, res);
});

// fires the recommender algorithm to run using the movie submitted by the user
router.post('/getRecommendedTitles', (req, res) => {
    console.log("req.body.reccTitle: " + req.body.reccTitle);
    let reccTitle = req.body.reccTitle;
    dbc.findRecommendedTitles(reccTitle, res);
});

router.post('/addAccuracy', (req, res) => {
    console.log("req.body.accBool: " + req.body.accBool);
    let accuracy = req.body.accBool;
    dbc.addAccuracy(accuracy, res);
});

module.exports = router;