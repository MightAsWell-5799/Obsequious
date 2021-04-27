const mongoose = require('mongoose')
var User = mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Server: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    channel: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('colourUser', User)
