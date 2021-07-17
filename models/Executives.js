import { Schema, model } from "mongoose";

const executivesSchema = new Schema({
 name : {
     type: String
 },
 level:{
     type: Number
 },
 phoneNumber : {
     type: Number
 },
 portfolio: {
     type: String
 },
 hallOfResidence : {
     type: String
 },
 yearOfAdmission : {
     type: Number
 },
 yearOfGraduation : {
     type: Number
 },
 country: {
     type: String
 }
});

export default model("Executive", executivesSchema);
