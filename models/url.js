const mongoose = require('mongoose');

const URLSchema = mongoose.Schema({
   urlCode: String,
   longUrl: String,
   shortUrl: String,
   date: {type: Date},
   expire: {type: Date} 
});

module.exports = URL = mongoose.model('Url', URLSchema);