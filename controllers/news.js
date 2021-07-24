// Load Models
const AppError = require("../utilities/appError");
const Category = require("../models/Category");
const News = require("../models/News");

exports.getHomepage =  async(req,res) => {
  try {
    let { page = 1, limit = 5, category } = req.query;
  let categories = await Category.find({});
  let allnews;
  let allunalterednews  = await News.find({});
  let news ;
  let categori ;
  if(category){
    if(category == "alfaaedah"){
      res.redirect('http://alfaaedahpress.wordpress.com')
    }else{
     news = await News.find({category}).sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    allnews = await News.find({category});
    categori = category; 
    }
  }else{
    news = await News.find({}).sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    allnews = await News.find({});
    categori = ""
  }
res.render("news/news", {categories,news,allnews, limit,page,allunalterednews, categori}) 
} catch (error) {
  return new AppError(error.message, error.status);
  }
}
exports.getNewForm = async (req, res) => {
  try {
    let news = await News.find({})
    let categories = await Category.find({})
      res.render("news/new", {news,categories });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.newHandler = async (req, res) => {
  try {
 let mssnnews =  await News.find({})
 let categories = await Category.find({})
    const { title, post, category, excerpt } = req.body;
    let errors = [];
    if (!title || !post || !excerpt || !category) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/new", { title, post, excerpt, errors, mssnnews, category,categories });
    } else {
    let foundNews =   await News.findOne({ title })
        if (foundNews) {
          errors.push({ msg: "A post with this title already exist" });
          res.render("news/new", {
            title,
            post,
            excerpt,
            errors,
            mssnnews,
            category,
            categories
          });
        } else {
          let author = req.user.username;
       await new News({
            post,
            title,
            author,
            excerpt,
            category,
          }).save()
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/news");
        }
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getSpecificNews = async (req, res) => {
  try{
  let slug = req.params.slug
let news =  await News.findOne({ slug})
  if(news){
    res.render("news/show", { news });
  }else{
  res.render('news/error')
  }
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getEditNewsForm = async (req, res) => {
  try {
  let slug = req.params.slug;
 let news =  await News.findOne({slug })
 let categories = await Category.find({});
    res.render("news/edit", { news,categories });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.editNewsHandler = async (req, res) => {
  try {
  let slug = req.params.slug;
  let categories = await Category.find({})
 let news = await News.findOne({slug})
    const { title, post, excerpt,category } = req.body;
    let errors = [];
    if (!title || !post || !excerpt || !category) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("news/edit", {
        title,
        post,
        excerpt,
        errors,
        news,
        categories,
        category
      });
    } else {
      await News.findOneAndUpdate({slug},req.body, {runValidators: true})     
          req.flash("success_msg", `Update Successfull`);
          res.redirect(`/news`);
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.deleteNews = async (req, res) => {
  try{
  let slug = req.params.slug;
  await News.findOneAndRemove({slug})
       req.flash("success_msg", `successfully deleted`);
        res.redirect("/news");
} catch (error) {
  return new AppError(error.message, error.status);
}
};

