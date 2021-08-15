
const mongoose = require("mongoose");
let Executives = require("./Executives");
const regimeSchema = new mongoose.Schema({
    year: {
        type: String
    }
})
regimeSchema.pre(/(Delete)|(Remove)/, async function(next){

    let thisRegime = await this.find(this.query)
  console.log(thisRegime, thisRegime[0].year)
   await Executives.deleteMany({regime : thisRegime[0].year})
   let del = await Executives.find({regime : thisRegime[0].year})
   console.log(del)
     next()
  })

module.exports = mongoose.model("Regime", regimeSchema)