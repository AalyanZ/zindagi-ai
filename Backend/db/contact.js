const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:String,
    email:String,
    comment:String
})

module.exports = mongoose.model('contact',contactSchema);