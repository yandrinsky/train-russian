const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');
const wordsIdCountScheme = new Schema({
    idCount: Number,
})

const WordsIdCount = mongoose.model('wordsIdCount', wordsIdCountScheme);

module.exports = WordsIdCount;