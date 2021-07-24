const mongoose = require('mongoose');
const News = require("./News");

const categorySchema = new mongoose.Schema({
    title: {
        type: String
    }
})

// categorySchema.pre(/(Delete)|(Remove)|(deleteOne)|(remove)/, {query : true, document : false}, async function(next){
// await News.deleteMany({
//     category: this
// })
//  next()
// })

// categorySchema.virtual('catNews').get( async function(){
//     let newsArray = []
//     let allnews = await News.find({})
//     for (const news of allnews) {
//           news.category == this.title ? newsArray.push(news) : ''
//     }
    
//     return newsArray
// })

module.exports = mongoose.model("Category", categorySchema)