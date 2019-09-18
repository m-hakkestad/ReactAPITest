const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userid: Number,
    text: String,
    comments: Number,
    likes: Number,
    retweets: Number
});

module.exports = mongoose.model('Post',postSchema);