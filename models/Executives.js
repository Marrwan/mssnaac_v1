const mongoose = require("mongoose");
const executivesSchema = new mongoose.Schema({
 name : {
     type: String
 },
 level:{
     type: Number
 },
 phoneNumber : {
     type:String
 },
 portfolio: {
     type: String
 },            
 hall : {
     type: String
 },
 yearOfAdmission : {
     type: String
 },
 yearOfGraduation : {
     type: String
 },
 country: {
     type: String
 },
 regime: {
     type: String
 },
 department: {
     type: String
 }
});

module.exports =  mongoose.model("Executive", executivesSchema);
