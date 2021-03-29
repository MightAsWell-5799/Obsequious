const mongoose = require('mongoose')
const schema = mongoose.Schema

var UserSchema = new schema({
    ID: {
        type: String,
        required: true,
    },
    DisplayName: {
        type: String,
        required: true,
    },
    Avatar: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('User', UserSchema)
