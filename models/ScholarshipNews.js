var mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const ScholarshipNewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  slug: {
    type: String,
     slug: "title" 
   },
  post: {
    type: String,
  },
  author: {
    type: String,
  },
  excerpt: {
    type: String
      },
  created: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

module.exports = mongoose.model("ScholarshipNews", ScholarshipNewsSchema);
