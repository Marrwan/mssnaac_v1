var mongoose = require("mongoose");

const MSSNNewsSchema = new mongoose.Schema({
  title: {
    type: String,
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
  created: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MssnComment",
    },
  ],
});

module.exports = mongoose.model("MSSNnews", MSSNNewsSchema);
