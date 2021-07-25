const mongoose = require('mongoose');
const Blog = require("./Blog");

const categorySchema = new mongoose.Schema({
    title: {
        type: String
    }
})

// categorySchema.pre(/(Delete)|(Remove)|(deleteOne)|(remove)/, {query : true, document : false}, async function(next){
// await Blog.deleteMany({
//     category: this
// })
//  next()
// })

// categorySchema.virtual('catNews').get( async function(){
//     let newsArray = []
//     let allnews = await Blog.find({})
//     for (const news of allnews) {
//           news.category == this.title ? newsArray.push(news) : ''
//     }
    
//     return newsArray
// })

module.exports = mongoose.model("Category", categorySchema)