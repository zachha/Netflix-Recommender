const Title = require('../models/Title.js');

module.exports = {

    // Queries the database and then finds the Euclidean-Similarity between the chosen show and every other show in the database. It then sorts them by smallest distance to largests (smaller number means a closer association with the chosen show) and sends them back to the user.
    findRecommendedTitles: (title, res) => {
        console.log("TOP LEVEL TITLE: " + title);
    
        // First we get the recommended title's object
        Title.find({ title: title})
        .then( searchData => {
            console.log("SEARCH DATA: " + searchData);
            let reccedTitle = searchData;

            // Performs the Euclidean Similarity algorithm on every title in the dataset
            Title.aggregate([
                /*
                {
                    $match: {
                        "genres": reccedTitle.genres
                    }
                },
                */
                {
                    $project: {
                        id: 1,
                        title: 1,
                        genres: 1,
                        type: 1,
                        runtime: 1,
                        seasons: 1,
                        description: 1,
                        imdb_score: 1,
                        imdb_votes: 1,
                        tmdb_score: 1,
                        distance: {
                            $sqrt: {
                                $add: [
                                    { $pow: [ { $subtract: [Number(reccedTitle.imdb_votes), Number("$imdb_votes") ] }, 2 ] },
                                    { $pow: [ { $subtract: [Number(reccedTitle.imdb_score), Number("$imdb_score") ] }, 2 ] }
                                ]
                            }
                        }
                    }
                },
                {
                    $match: { distance: {$ne: NaN }}
                },
                {
                    $sort: { distance: 1}
                },
                {
                    $limit: 5
                }
            ]).then(recommendedShows => {
                console.log(recommendedShows);
                res.send(recommendedShows);
            }).catch(err => {
                console.log(err);
                res.send(err);
            })
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
