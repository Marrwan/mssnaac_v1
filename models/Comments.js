const mongoose = require('mongoose');

const commmentSchema = new mongoose.Schema(
  {
    news: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'News',
      required: [true, 'A Comment must belong to a post !'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'A Comment must belong to a User !'],
    },
    text: {
      type: String,
      required: [true, 'A Comment must has a body'],
    },
    created: {
      type: Date,
      default: Date.now,
    },
  },
  // {
  //   toObject: { virtuals: true },
  //   toJSON: { virtuals: true },
  // }
);

commmentSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'author',
    select: 'username ',
  }).populate({
    path : 'news',
    select: 'title'
  })

  next();
});




module.exports =  mongoose.model('Comment', commmentSchema);



// 2266760771 -MUHAMMAD UTHMAN ZAINAB ZENITH BANK 10K
