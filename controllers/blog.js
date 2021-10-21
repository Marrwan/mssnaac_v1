// Load Models
const AppError = require("../utilities/appError");
const Category = require("../models/Category");
const Blog = require("../models/Blog");

exports.getHomepage =  async(req,res) => {
  try {
  let { page = 1, limit = 5, category } = req.query;
  let categories = await Category.find({});
  let allblogs;
  let allunalteredblogs  = await Blog.find({});
  let blogs ;
  let popularBlog = await Blog.find({}).sort({comments: -1}).limit(3);
  let categori ;
  if(category){
    if(category == "alfaaedah"){
      res.redirect('http://alfaaedahpress.wordpress.com')
    }else{
     blogs = await Blog.find({category}).sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    allblogs = await Blog.find({category});
    categori = category; 
    }
  }else{
    blogs = await Blog.find({}).sort({ created: "desc" })
    .limit(limit * 1)
    .skip((page - 1) * limit);
    allblogs = await Blog.find({});
    categori = ""
  }
res.render("blogs/index", {categories,blogs,allblogs, limit,page,allunalteredblogs, categori, popularBlog}) 
} catch (error) {
  return new AppError(error.message, error.status);
  }
}
exports.getNewForm = async(req, res) => {
  try {
    let blogs = await Blog.find({})
    let categories = await Category.find({})
      res.render("blogs/new", {blogs,categories });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.newHandler = async(req, res) => {
  try {
 let blogs =  await Blog.find({})
 let categories = await Category.find({})
    const { title, post, category, excerpt } = req.body;
    let errors = [];
    if (title.trim().length === 0  || post.trim().length === 0 ||  excerpt.trim().length === 0||  category.trim().length === 0) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters" });
    }
    if (errors.length > 0) {
      res.render("blogs/new", { title, post, excerpt, errors, blogs, category,categories });
    } else {
    let foundBlog =   await Blog.findOne({ title })
        if (foundBlog) {
          errors.push({ msg: "A post with this title already exist" });
          res.render("Blog/new", {
            title,
            post,
            excerpt,
            errors,
            blogs,
            category,
            categories
          });
        } else {
          let author = req.user.username;
       await new Blog({
            post,
            title,
            author,
            excerpt,
            category,
          }).save()
            req.flash("success_msg", `Post has been successfully added`);
            res.redirect("/blogs");
        }
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.getSpecificBlog = async (req, res) => {
  try{
    let slug = req.params.slug
    let blog =  await Blog.findOne({ slug})
    let blogs = await Blog.find({}).sort({created : "desc"})
// if(!blog) {
//   res.render("blogs/show", {blogs, blog});
// }else{
    res.render("blogs/show", { blog, blogs });
  // }
  } catch (error) {
    return new AppError(error.message, error.status);
  }
};
exports.getEditBlogForm = async (req, res) => {
  try {
  let slug = req.params.slug;
 let blog =  await Blog.findOne({slug })
 let categories = await Category.find({});
    res.render("blogs/edit", { blog,categories });
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.editBlogHandler = async(req, res) => {
  try {
  let slug = req.params.slug;
  let categories = await Category.find({})
 let blog = await Blog.findOne({slug})
    const { title, post, excerpt,category } = req.body;
    let errors = [];
    if (title.trim().length === 0 || post.trim().length === 0 || excerpt.trim().length === 0 || category.trim().length === 0) {
      errors.push({ msg: "Please fill in all fields" });
    }
    if (title.lenght < 5) {
      errors.push({ msg: "Title must be at least 5 characters"});
    }
    if (errors.length > 0) {
      res.render("blogs/edit", {
        title,
        post,
        excerpt,
        errors,
        blog,
        categories,
        category
      });
    } else {
      await Blog.findOneAndUpdate({slug},req.body, {runValidators: true})     
          req.flash("success_msg", `Update Successful`);
          res.redirect(`/blogs`);
    }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.deleteBlog = async (req, res) => {
  try{
  let slug = req.params.slug;
  await Blog.findOneAndRemove({slug})
       req.flash("success_msg", `successfully deleted`);
        res.redirect("/blogs");
} catch (error) {
  return new AppError(error.message, error.status);
}
};