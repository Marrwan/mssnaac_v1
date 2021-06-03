var mongoose = require("mongoose");

const AcademicNewsSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  post: {
    type: String,
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
