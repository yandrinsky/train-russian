const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logsScheme = new Schema({
    date: String,
    users: Array,
    newRegs: Array,
});

const Logs = mongoose.model('logs', logsScheme);

module.exports = Logs;