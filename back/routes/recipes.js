let express = require('express'),
    router = express.Router(),
    Recipe = require('../models/Recipe.js');

/* GET ALL RECIPES */
router.get('/api/allrecipes', function(req, res, next) {
    Recipe.find({}, null,
    { sort: {name: 1} },
    function (err, recipes) {
        console.log('All recipes found');
        if (err) return next(err);
        res.json(recipes);
    });
});
  
/* GET SINGLE RECIPE BY ID */
router.get('/api/recipe/:id', function(req, res, next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        console.log('Fetched single recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});
  
/* SAVE RECIPE */
router.post('/api/postrecipe', function(req, res, next) {
    Recipe.create(req.body, function (err, post) {
        console.log('Posting new recipe');
        if (err) return next(err);
        res.json(post);
    });
});
  
/* UPDATE RECIPE */
router.put('/api/updaterecipe/:id', function(req, res, next) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, recipe) {
        console.log('Updating a recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});
  
/* DELETE RECIPE */
router.delete('/api/delrecipe/:id', function(req, res, next) {
    Recipe.findByIdAndRemove(req.params.id, req.body, function (err, recipe) {
        console.log('Deleting a recipe');
        if (err) return next(err);
        res.json(recipe);
    });
});
  
module.exports = router;