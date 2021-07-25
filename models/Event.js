const mongoose  = require("mongoose");

const eventSchema = new mongoose.Schema({
    title:String,
    date: Date,
    image: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Event', eventSchema)