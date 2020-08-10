const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ipScheme = new Schema({
    ip: Number,
});

const Ip = mongoose.model('ips', ipScheme);

module.exports = Ip;