const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    login: String,
    password: String,
    firstName: String,
    lastName: String,
    role: String,
    learn: Object,
});

const User = mongoose.model('users', userScheme);

module.exports = User;