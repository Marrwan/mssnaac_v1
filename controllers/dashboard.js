
const Portfolio = require('../models/Portfolio');
const User = require("../models/User");
const AppError = require("../utilities/appError");
const Regime = require("../models/Regime");
const  Executives = require("../models/Executives");
const Category = require('../models/Category');

exports.getDashboard = async (req, res) => {
  try {
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
    let regimes =    await Regime.find({}).sort({year : "asc"})
    let categories = await Category.find({})
 res.render("dashboard", { users,portfolios,regimes, categories });
  } catch (error) {
    return new AppError(error.message, error.status);
  } 
};
exports.newRegimeHandler = async(req,res) => {
  try {
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
    let regimes =    await Regime.find({}).sort({year : "asc"})
    let categories = await Category.find({})
 let {year} = req.body;
 let errors = []; 
 if(!year){
   errors.push({"msg": "Please fill in required fields"})
 }
 if(errors.length > 0){
   res.render("dashboard", {portfolios,errors,regimes,users,categories})
 }else{
  let foundYear =   await  Regime.findOne({year:year})
     if(foundYear){
       errors.push({"msg" : `${foundYear.year} regime already exist`})
       res.render("dashboard", {errors,portfolios,regimes ,users, categories});
     }else{
       let newRegime = new Regime({year})
       newRegime.save((err,newRegime)=>{
      req.flash("success_msg", `${newRegime.year} added successfully`)
      res.redirect('/dashboard')
       })
     }
 } 
} catch (error) {
    return new AppError(error.message, error.status);
  }
}
exports.updateRegimeHandler = async(req,res) => {
  try {
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
    let regimes =    await Regime.find({}).sort({year : "asc"})
    let categories = await Category.find({})
  let id  = req.params.id;
  let errors = [];
let regime =   await Regime.findOne({_id:id})
    let {year} = req.body
    if(!year){
      errors.push({"msg": "please fill in the required fields"})
    }
    if(errors.length > 0){
      res.render("dashboard", {portfolios,errors,regimes,users,categories})
    }else{
  let foundRegime = await Regime.findOne({_id:id})
        if(foundRegime){
          errors.push({"msg" : `${foundRegime.year} already exist`})
          res.render("dashboard", {portfolios,regimes,errors,users,categories})
        }else{
await Regime.findOneAndUpdate({year}, req.body)
 
  req.flash("success_msg", `Update Successfull`);
  res.redirect(`/dashboard`);

   }
    }
  } catch (error) {
    return new AppError(error.message, error.status);
  }

}
exports.deleteRegimeHandler = async(req,res) => {
try{
  let id  = req.params.id;
  await Regime.findOneAndRemove({_id: id})
        req.flash("success_msg", `successfully deleted`);
        res.redirect("/dashboard");
} catch (error) {
  return new AppError(error.message, error.status);
}
}
exports.newPortfolioHandler = async(req,res) => {
  try{
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
    let regimes =    await Regime.find({}).sort({year : "asc"})
    let categories = await Category.find({})
  let errors = [];
 let {title} = req.body;

if(!title){
  errors.push({'msg': "Please fill in required fields"})
}

if(errors.length > 0) {
      res.render("dashboard", { users,errors,title,portfolios, regimes,categories });
}
else{
 let foundPortfolio = await Portfolio.findOne({title:title})
    if(foundPortfolio){
      errors.push({'msg' : "A portfolio with this title already exist"})
          res.render("dashboard", { users,errors,title,portfolios ,categories});
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