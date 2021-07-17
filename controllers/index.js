const axios = require("axios");
// LOAD MODELS

const MSSNNews = require("../models/MSSNNews");
const AcademicNews = require("../models/AcademicNews");
const ScholarshipNews = require("../models/ScholarshipNews");
const Portfolio = require('../models/Portfolio');
const User = require("../models/User");
const AppError = require("../utilities/appError");
const Regime = require("../models/Regime");

exports.getHomepage = async (req, res) => {
  try {
 let mssnnews =    await MSSNNews.find({}).sort({ created: "desc" });
 let academicnews =   await AcademicNews.find({}).sort({ created: "desc" });
 let scholarshipnews =    await ScholarshipNews.find({}).sort({ created: "desc" });
let response = await axios({ method: 'GET',
          url: 'https://api.sunnah.com/v1/hadiths/random',
          headers: { 'x-api-key': 'SqD712P3E82xnwOAEOkGd5JZH8s9wRR24TqNFzjk' },
          body: '{}' });
const random = Math.floor(Math.random() * response.data.length);
const data = response.data.hadith[0];
      return  res.render("index", { mssnnews, academicnews, scholarshipnews, data  });
  } catch (err) {
    console.log(err);
    return new AppError(err.message, err.status);
  }
};
exports.getExecutives = async(req,res)=>{
  try {
  let portfolios =  await Portfolio.find({})
  let regimes =   await Regime.find({}).sort({year : "asc"})
     return res.render('executives', {portfolios,regimes})
} catch (error) {
  return new AppError(error.message, error.status);
}
}
exports.getDashboard = async (req, res) => {
  try {
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
 res.render("dashboard", { users,portfolios });
  } catch (error) {
    return new AppError(error.message, error.status);
  } 
};

exports.logout = (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.redirect("back");
};

exports.newRegimeHandler = async(req,res) => {
  try {
  let portfolios = await Portfolio.find({})
 let regimes =    await Regime.find({})
 let {year} = req.body;
 let errors = []; 
 if(!year){
   errors.push({"msg": "Please fill in required fields"})
 }
 if(errors.length > 0){
   res.render("executives", {portfolios,errors,regimes})
 }else{
  let foundYear =   await  Regime.findOne({year:year})
     if(foundYear){
       errors.push({"msg" : `${foundYear.year} regime already exist`})
       res.render("executives", {errors,portfolios,regimes });
     }else{
       let newRegime = new Regime({year})
       newRegime.save((err,newRegime)=>{
      req.flash("success_msg", `${newRegime.year} added successfully`)
      res.redirect('/executives')
       })
     }
 } 
} catch (error) {
    return new AppError(error.message, error.status);
  }
}
exports.updateRegimeHandler = async(req,res) => {
  try {
let regimes = await Regime.find({}).sort({year : "asc"})
let portfolios =  await Portfolio.find({})
  let updateYear  = req.params.year;
  let errors = [];
let regime =   await Regime.findOne({year:year})
    let {year} = req.body
    if(!year){
      errors.push({"msg": "please fill in the required fields"})
    }
    if(errors.length > 0){
      res.render("executives", {portfolios,errors,regimes})
    }else{
  let foundRegime = await Regime.findOne({year:updateYear})
        if(foundRegime){
          errors.push({"msg" : `${foundRegime.year} already exist`})
          res.render("executives", {portfolios,regimes,errors})
        }else{
let updatedRegime = await Regime.findOneAndUpdate({year}, req.body, (err,updatedRegime)=>{
  if (err) {
    return new AppError(err.message, err.status);
  }
  req.flash("success_msg", `Update Successfull`);
  res.redirect(`/executives`);
})
   }
    }
  } catch (error) {
    return new AppError(error.message, error.status);
  }

}
exports.deleteRegimeHandler = async(req,res) => {
try{
  let {year} = req.body
  await Regime.findOneAndRemove({year: year})
        req.flash("success_msg", `successfully deleted`);
        res.redirect("/executives");
} catch (error) {
  return new AppError(error.message, error.status);
}
}
exports.newPortfolioHandler = async(req,res) => {
  try{
 let users =  await User.find({})
  let portfolios =  await Portfolio.find({})
  let errors = [];
 let {title} = req.body;

if(!title){
  errors.push({'msg': "Please fill in required fields"})
}

if(errors.length > 0) {
      res.render("dashboard", { users,errors,title,portfolios });
}
else{
 let foundPortfolio = await Portfolio.findOne({title:title})
    if(foundPortfolio){
      errors.push({'msg' : "A portfolio with this title already exist"})
          res.render("dashboard", { users,errors,title,portfolios });
     
    }else{
      let newPortfolio = new Portfolio({title})
    await  newPortfolio.save()
        req.flash(
          "success_msg",
          "New portfolio added successfully!"
        );
        res.redirect('/dashboard')
    }
}
} catch (error) {
  return new AppError(error.message, error.status);
}
}