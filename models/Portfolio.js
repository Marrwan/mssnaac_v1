var mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
 title:{
     type:String,
 }
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
