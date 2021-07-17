
const mongoose = require("mongoose");
const regimeSchema = new mongoose.Schema({
    year: {
        type: String
    }
})

module.exports = mongoose.model("Regime", regimeSchema)