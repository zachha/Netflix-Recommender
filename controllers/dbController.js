const Title = require('../models/Title.js');

module.exports = {

    findRecommendedTitles: (req, res) => {

        //Searches the database for all titles then returns 10.
        Title.find({})
        .limit(10)
        .then(searchData => {
            if(searchData.length>0) {
                console.log(searchData);
                res.send(searchData);
            } else {
                console.log("EMPTY SEARCH")
            } 
        }).catch(err => {
            return res.send(err);
        });
    }, 

    findSearchedTitles: (title, res) => {
        Title.find({
            title: { "$regex": title, "$options": "i"}    
        })
        .limit(10)
        .then(searchData => {
            if(searchData.length>0) {
                console.log(searchData);
                res.send(searchData);
            } else {
                console.log("EMPTY SEARCH")
            } 
        }).catch(err => {
            return res.send(err);
        })
    }
}
