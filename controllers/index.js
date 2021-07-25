const axios = require("axios");
// LOAD MODELS
const Portfolio = require('../models/Portfolio');
const AppError = require("../utilities/appError");
const Regime = require("../models/Regime");
const  Executives = require("../models/Executives");
const Blog = require("../models/Blog");

exports.getHomepage = async (req, res) => {
  try {
 let blogs =    await Blog.find({}).sort({ created: "desc" });
let response = await axios({ method: 'GET',
          url: 'https://api.sunnah.com/v1/hadiths/random',
          headers: { 'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' },
          body: '{}' });
const random = Math.floor(Math.random() * response.data.length);
const data = response.data.hadith[0];
      return  res.render("index", { blogs,  data  });
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getExecutives = async(req,res)=>{
  try {
  let portfolios =  await Portfolio.find({})
  let regimes =   await Regime.find({}).sort({year : "asc"})
  let executives = await Executives.find({}).sort({created: "desc"})
     return res.render('executives', {portfolios,regimes,executives})
} catch (error) {
  return new AppError(error.message, error.status);
}
}
exports.newExecutivesHandler = async(req,res)=>{
  try {
    let portfolios =  await Portfolio.find({})
    let regimes =   await Regime.find({}).sort({year : "asc"})
    let executives = await Executives.find({}).sort({created: "desc"})
    let { portfolio,name,level, hall,phoneNumber,department,yearOfAdmission,yearOfGraduation,country,regime} = req.body;
    let errors = [];
    if(!portfolio || !name || !level  || !hall || !phoneNumber || !department || !yearOfAdmission || !yearOfGraduation || !country || !regime){
errors.push({"msg" : "Please fill in the required fields"})
    }
    if(errors.length > 0){
      res.render("executives", {portfolios, regimes, errors, executives, name, phoneNumber, department})
    }else{
      let newExecutive = new Executives(
        {hall, portfolio,name,level,phoneNumber,department,yearOfAdmission,yearOfGraduation,country,regime}
      )
      let savedExec = await newExecutive.save()
      req.flash("success_msg", ` ${savedExec.name} created successfully!`)
      res.redirect("/executives")
    }
  } catch (error) {
  console.log(error);
    return new AppError(error.message, error.status);
  }
}


exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("back");
};

