var mongoose = require("mongoose");

const ScholarshipNewsSchema = new mongoose.Schema({
  title: {
    type: String,
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
