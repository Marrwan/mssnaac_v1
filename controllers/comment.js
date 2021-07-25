const Comment = require('../models/Comments');
const News = require('../models/Blog');

exports.getNewCommentForm = (req,res)=>{
    res.render('comments/new')
}

exports.newCommentHandler = async(req,res)=>{
    try { 
    let {slug} = req.params;
    let {text} = req.body;
    let author = req.user;
    let news = await News.findOne({slug});
    let comment = await Comment.create({text,author,news});
   await news.comments.push(comment)
    await news.save()
res.redirect(`/blogs/${slug}`)
  } catch (error) {
        console.log(error);
    }
}