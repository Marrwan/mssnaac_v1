const Category =  require("../models/Category");
const News =      require("../models/Blog");
const AppError =  require("../utilities/appError");
const Portfolio = require("../models/Portfolio");
const Regime =    require("../models/Regime");
const Event =     require("../models/Event");
const User =      require("../models/User");

exports.newCategoryHandler = async (req,res)=>{
    try {
        const {title} = req.body;
        let errors = [];
        let users = await User.find({})
        let portfolios =  await Portfolio.find({})
        let regimes =    await Regime.find({}).sort({year : "asc"})
        let categories = await Category.find({})
        let events = await Event.find({})
     
        if(title.trim().length === 0){
            errors.push({"msg": "Category Must have a title"})
        }
        if(errors.length > 0){
            res.render("dashboard", { users,portfolios,regimes,errors,categories,events });
        }else{
            let foundCategory = await Category.findOne({title})
            if(foundCategory){
                errors.push({"msg" : `A category with the title "${foundCategory.title}" already exist, cant't you see?`})
                res.render("dashboard", { users,portfolios,regimes, errors,categories,events });
            }else{
              await new Category({title}).save()
              req.flash("success_msg" , `${title} created successfully`)
              res.redirect("/dashboard")
            }
        }
    } catch (error) {
        return new AppError(error.message, error.status);
    }
}

exports.deleteCategoryHandler = async (req,res)=>{
    try {
  let category =  await Category.findOneAndDelete({title: req.params.title});
  await News.deleteMany({category: category.title})
    req.flash("success_msg", `${category.title} successfully deleted`)
    res.redirect("/dashboard")
} catch (error) {
        new AppError(error.message, error.status)
    }
}