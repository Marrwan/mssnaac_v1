const Category = require("../models/Category");
const News = require("../models/News");
const AppError = require("../utilities/appError");

exports.newCategoryHandler = async (req,res)=>{
    try {
        const {title} = req.body;
        let errors = [];
        if(!title){
            errors.push({"msg": "Category Must have a title"})
        }
        if(errors.length > 0){
            res.render("/dashboard", {errors})
        }else{
            let foundCategory = await Category.findOne({title})
            if(foundCategory){
                errors.push({"msg" : `A category with the title "${foundCategory.title}" already exist, cant't you see?`})
                res.render("/dashboard", {errors})
            }else{
              await new Category({title}).save()
              req.flash("success_msg" , `${title} created successfully`)
              res.redirect("/dashboard")

            }
        }
       
    } catch (error) {
        
    }
}

exports.editCategoryHandler = async( req,res) => {
    try {
        
    } catch (error) {
        
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