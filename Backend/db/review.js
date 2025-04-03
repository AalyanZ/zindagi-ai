const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    review:String,
    name:String,
    email:String
})

module.exports = mongoose.model('review',reviewSchema);