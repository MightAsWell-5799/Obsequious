const mongoose = require('mongoose')
var Server = mongoose.Schema({
    ID: {
        type: String,
        required: true,
    },
    Group: {
        type: String,
        required: true,
    },
    Enabled: {
        type: Boolean,
        required: true,
    },
})
module.exports = mongoose.model('houseServer', Server)
