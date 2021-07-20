var mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  userType: {
    type: String,
    enum: ["admin", "student"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  email: {
    type: String,
    lowercase: true,
    unique : [true, "A user with that email already exist!"]
  },
});

module.exports = mongoose.model("User", userSchema);
