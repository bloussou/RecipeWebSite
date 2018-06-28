let express = require('express'),
    searchRouter = express.Router(),
    Recipe = require('../models/Recipe.js');
  
/* SAVE RECIPE */
searchRouter.post('/api/searchrecipe', function(req, res, next) {
    let search = req.body;
    Recipe.find({
        "name": new RegExp(search.name, 'i'),
        "origin": new RegExp(search.origin, 'i'),
        "type": new RegExp(search.type, 'i'),
        "difficulty": { "$in": search.difficulty },
        "$and": [{"duration": {"$gte": search.durationRange[0]}}, {"duration": {"$lte": search.durationRange[1]}}]
    },
    null,
    {
        sort: {name: 1}
    },
    function (err, recipes) {
        console.log('All recipes matchin query have been found');
        if (err) return next(err);
        res.json(recipes);
    });
});

module.exports = searchRouter;