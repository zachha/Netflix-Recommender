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
    console.log(req.body.searchTitle);
    //console.log("test: " + req.params.title);
    let formData = req.body.searchTitle;
    console.log("GETSEARCHED ROUTE FIRED, FORMDATA: " + formData)
    dbc.findSearchedTitles(formData, res);
});

// fires the recommender algorithm to run using the movie submitted by the user
router.post('/getRecommendedTitles', (req, res) => {
    //let title = req.params.body;
    console.log("ALGORITHM ROUTE FIRED, TITLE: " + title);
    dbc.findRecommendedTitles(title, res);
})

module.exports = router;