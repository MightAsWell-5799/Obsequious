const mongoose = require('mongoose')
const schema = mongoose.Schema

var UserSchema = new schema({
    ID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('User', UserSchema)
