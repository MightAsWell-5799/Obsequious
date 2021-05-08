const mongoose = require('mongoose')
var User = mongoose.Schema({
    ID: {
        type: String,
        required: true,
        
    },
    name: {
        type: String,
        required: true,
    },
    avatarURL: {
        type: String,
        required: true,
    },
    list: {
        type: Array,
        required: true,
    }
})
module.exports = mongoose.model('listUser', User)
