const Comment = require('../models/Comments');
const Blog = require('../models/Blog');

exports.getNewCommentForm = (req,res)=>{
    res.render('comments/new')
}

exports.newCommentHandler = async(req,res)=>{
    try { 
    let {slug} = req.params;
    let {text} = req.body;
    let author = req.user;
    let blog = await Blog.findOne({slug});
    let comment = await Comment.create({text,author,blog});
   await blog.comments.push(comment)
    await blog.save()
res.redirect(`/blogs/${slug}`)
  } catch (error) {
        console.log(error);
    }
}