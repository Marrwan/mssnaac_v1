var mongoose = require("mongoose");
var slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const AcademicNewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
  },
  slug: {
    type: String,
     slug: "title" 
   },
  author: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model("AcademicNews", AcademicNewsSchema);
