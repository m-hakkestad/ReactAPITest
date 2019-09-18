const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: String,
    username: String,
    profileImg: String
});

module.exports = mongoose.model('User',userSchema);

