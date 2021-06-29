const mongoose = require('mongoose')
var Vote = mongoose.Schema({
    //this is just gonna be the query
    name: {
        type: String,
        required: true
    },
    //public/council
    scope: {
        type: String,
        required: true
    },
    //will be calculated in seconds to match with unix time stamp, likely will just be the unix timestamp of when it should end
    length: {
        type: Number,
        required: true
    },
    //the ID of the discord message that will be holding the reactions
    messageID: {
        type: String,
        required: true
    }

})
module.exports = mongoose.model('vote', Vote)