const mongoose = require('mongoose');

const commmentSchema = new mongoose.Schema(
  {
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: [true, 'A Comment must belong to a post !'],
    },
    author: {
      type: String,
      required: [true, 'A Comment must belong to a User !'],
    },
    text: {
      type: String,
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
    path : 'blog',
    select: 'title'
  })
  // .populate({
  //   path: 'author',
  //   select: 'username ',
  // })

  next();
});




module.exports =  mongoose.model('Comment', commmentSchema);



// 2266760771 -MUHAMMAD UTHMAN ZAINAB ZENITH BANK 10K
