const Comment = require('../models/Comments');
const Blog = require('../models/Blog');
const AppError = require('../utilities/appError');


exports.getNewCommentForm = (req,res)=>{
    res.render('comments/new')
}

exports.newCommentHandler = async(req,res)=>{
    try { 
    let {slug} = req.params;
    let {text, author} = req.body;
    let blog =  await Blog.findOne({ slug})
    let blogs = await Blog.find({}).sort({created : "desc"})
    let errors = [];
    if(text.trim().length === 0) errors.push({msg:"Comment can not be blank"});
    if(errors.length > 0) res.render("blogs/show", { blog, blogs, errors });
    author = req.user ? req.user.username : author ? author : "Anonymous 😎";
    let comment = await Comment.create({text,author,blog});
    await blog.comments.push(comment)
    await blog.save()
res.redirect(`/blogs/${slug}`)
  } catch (error) {
        new AppError(error.message,error.status)
    }
}