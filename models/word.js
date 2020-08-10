const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const wordScheme = new Schema({
    word: String,
    emphasis: Number,
    syllable: Number,
    id: Number,
});
const Word = mongoose.model('word', wordScheme);

module.exports =  Word;