let express = require('express'),
    router = express.Router(),
    Recipe = require('../models/Recipe.js');

const auth = require('./auth');




/* GET ALL RECIPES */
router.get('/api/allrecipes', auth.optional, function (req, res, next) {
    Recipe.find({}, null, {
            sort: {
                name: 1
            }
        },
        function (err, recipes) {
            if (err) return next(err);
            res.json(recipes);
        });
});

/* GET SINGLE RECIPE BY ID */
router.get('/api/recipe/:id', auth.optional, function (req, res, next) {
    Recipe.findById(req.params.id, function (err, recipe) {
        if (err) return next(err);
        res.json(recipe);
    });
});

/* SAVE RECIPE */
router.post('/api/postrecipe', auth.required, function (req, res, next) {
    Recipe.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* UPDATE RECIPE */
router.put('/api/updaterecipe/:id', auth.required, function (req, res, next) {
    Recipe.findByIdAndUpdate(req.params.id, req.body, function (err, recipe) {
        if (err) return next(err);
        res.json(recipe);
    });
});

/* DELETE RECIPE */
router.delete('/api/delrecipe/:id', auth.required, function (req, res, next) {
    Recipe.findByIdAndRemove(req.params.id, req.body, function (err, recipe) {
        if (err) return next(err);
        res.json(recipe);
    });
});

module.exports = router;