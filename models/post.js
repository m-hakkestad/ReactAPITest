const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    text: String,
    score: Number,
    date: Date,
    commentids: [String]
});

module.exports = mongoose.model('Post',postSchema);