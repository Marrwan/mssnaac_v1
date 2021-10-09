var mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
var timestamp = require('mongoose-timestamp')
mongoose.plugin(slug);


let Comment = require('./Comments')
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
     type: String,
      slug: "title" 
    },
category : {
    type: String
},
  post: {
    type: String,
  },
  author: {
    type:String,
  },
  excerpt: {
    type: String
      },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
blogSchema.plugin(timestamp, {
  createdAt: 'created',
  updatedAt: 'updated'
})
blogSchema.pre(/(Delete)|(Remove)/, async function(next){

  let thisblog = await this.find(this.query)

  await Comment.deleteMany({blog : thisblog})
   next()
})
blogSchema.pre(/(findOne)/,   function(next){
  this.populate({
    path: 'comments',
    select: "author _id news created text",
  })
   next()
  })

// blogSchema.virtual('comments', {
//   ref: 'Comment',
//   foreignField: 'news',
//   localField: '_id',
// });
module.exports = mongoose.model("Blog", blogSchema);
