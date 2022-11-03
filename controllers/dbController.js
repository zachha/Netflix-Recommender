const Title = require('../models/Title.js');
const Accuracy = require('../models/Accuracy.js');

module.exports = {
    // Queries the database and then finds the Euclidean-Similarity between the chosen show and every other show in the database. It then sorts them by smallest distance to largests (smaller number means a closer association with the chosen show) and sends them back to the user.
    findRecommendedTitles: (title, res) => {
        // First we get the recommended title's object
        Title.find({ title: title})
        .then( searchData => {
            let reccedTitle = searchData;
            // Performs the Euclidean Similarity algorithm on every title in the matched dataset
            Title.aggregate([
                {
                    $match: {
                        // Removes the user's title from the query so it can't match against itself
                        "title": {$ne: reccedTitle[0].title},
                        // Makes sure that the recommended movies match at least one type of genre
                        "genres": { $elemMatch: { $in: reccedTitle[0].genres } }
                    }
                },
                {
                    $project: {
                        id: 1,
                        title: 1,
                        genres: 1,
                        type: 1,
                        description: 1,
                        imdb_score: 1,
                        imdb_votes: 1,
                        distance: {
                            $sqrt: {
                                $add: [
                                    { $pow: [ { $subtract: [ { $toDouble: reccedTitle[0].imdb_score}, { $toDouble: "$imdb_score" } ] }, 2 ] },
                                    { $pow: [ { $subtract: [ { $toDouble: reccedTitle[0].imdb_votes}, { $toDouble: "$imdb_votes" } ] }, 2 ] }
                                ]
                            }
                        }
                    }
                },
                // Sorts the list by smallest euclidean distance to largest. 
                {
                    $sort: { distance: 1}
                },
                // Limits the recommended list to 5
                {
                    $limit: 5
                }
            ]).then(recommendedShows => {
                res.send(recommendedShows);
            }).catch(err => {
                console.log(err);
                res.send(err);
            })
        }).catch(err => {
            return res.send(err);
        });
    }, 

    // Reads the db and returns titles that contain the string input
    findSearchedTitles: (title, res) => {
        Title.find({
            title: { "$regex": title, "$options": "i"}    
        })
        .limit(10)
        .then(searchData => {
            if(searchData.length>0) {
                res.send(searchData);
            };
        }).catch(err => {
            return res.send(err);
        });
    },

    // Adds the true or false boolean to the Accuracy table based on user input
    addAccuracy: (accuracy, res) => {
        Accuracy.create(
            { accurate: accuracy }
        ).then( data => {
            console.log("Accuracy collection updated");
            res.send(data);
        }).catch(err => {
            return res.send(err);
        });
    },
}
