const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    score: Number,
    date: Date,
    postid: String
});

module.exports = mongoose.model('Comment',commentSchema);