let mongoose = require('mongoose');

let RecipeSchema = new mongoose.Schema({
    name: String,
    duration: Number,
    difficulty: String,
    origin: String,
    type: String,
    ingredients: Array,
    steps: String
});

module.exports = mongoose.model('recipes', RecipeSchema);