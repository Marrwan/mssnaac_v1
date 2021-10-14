
const Portfolio = require('../models/Portfolio');
const User = require("../models/User");
const AppError = require("../utilities/appError");
const Regime = require("../models/Regime");
const Category = require('../models/Category');
const Event = require('../models/Event');

let errorsPush = (errors, msg) => {
 !msg ?
    errors.push({"msg" : "Please fill in required fields"})
:
  errors.push({"msg" : msg})
}
exports.newEventHadler = async(req,res)=>{
try {
  let users = await User.find({})
  let portfolios =  await Portfolio.find({})
  let regimes =    await Regime.find({}).sort({year : "asc"})
  let categories = await Category.find({})
  let events = await Event.find({})
 let {title,date,image} = req.body;
 
 let errors = [];
 if(title.trim().length === 0 || !date || date.trim().length === 0 ) {
errorsPush(errors)
 } 
 if(new Date(date) < new Date().getTime()){
   errorsPush(errors, "You can't go back in time 😜😜")
 }
 if(errors.length > 0){
  res.render("dashboard", { users,portfolios,regimes, errors, categories,events });
 }else if(events.length == 1){
  errorsPush(errors, "You can only have one event at a time")
  res.render("dashboard", { users,portfolios,regimes, errors, categories,events });
 }else{
   await new Event({title,date,image}).save()
  req.flash("success_msg", "Event created successfully!")
   res.redirect('/dashboard')

 }
} catch (error) {
  new AppError(error.message,error.status)
}
}
exports.deleteEventHandler = async(req,res)=>{
  try {
 let event =   await Event.findByIdAndDelete(req.params.id)
    req.flash("success_msg", `${event.title} deleted successfully`)
    res.redirect('/dashboard')
  } catch (error) {
    new AppError(error.message,error.status)
  }
}
exports.getDashboard = async (req, res) => {
  try {
    let users = await User.find({})
    let portfolios =  await Portfolio.find({})
    let regimes =    await Regime.find({}).sort({year : "asc"})
    let categories = await Category.find({})
    let events = await Event.find({})
    // if(req.user.userType == 'admin'){
    // return res.render("adminsignup", { users,portfolios,regimes, categories,events });
    // }
 res.render("dashboard", { users,portfolios,regimes, categories,events });
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
    let events = await Event.find({})
 let {year} = req.body;
 let errors = []; 
 if(year.trim().length === 0){
  errorsPush(errors)
 }
 if(errors.length > 0){
   res.render("dashboard", {portfolios,errors,regimes,users,categories,events})
 }else{
  let foundYear =   await  Regime.findOne({year:year})
     if(foundYear){
       errors.push({"msg" : `${foundYear.year} regime already exist`})
       res.render("dashboard", {errors,portfolios,regimes ,users, categories,events});
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
    let events = await Event.find({})
  let id  = req.params.id;
  let errors = [];
let regime =   await Regime.findOne({_id:id})
    let {year} = req.body
    if(year.trim().length === 0){
      errors.push({"msg": "please fill in the required fields"})
    }
    if(errors.length > 0){
      res.render("dashboard", {portfolios,errors,regimes,users,categories,events})
    }else{
  let foundRegime = await Regime.findOne({_id:id})
        if(foundRegime){
          errors.push({"msg" : `${foundRegime.year} already exist`})
          res.render("dashboard", {portfolios,regimes,errors,users,categories,events})
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
    let events = await Event.find({})
  let errors = [];
 let {title} = req.body;

if(title.trim().length === 0){
  errorsPush(errors)
}
if(errors.length > 0) {
      res.render("dashboard", { users,errors,title,portfolios, regimes,categories ,events});
}
else{
 let foundPortfolio = await Portfolio.findOne({title:title})
    if(foundPortfolio){
      errors.push({'msg' : "A portfolio with this title already exist"})
          res.render("dashboard", { users,errors,title,portfolios ,categories,events});
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