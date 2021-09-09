const bcrypt = require("bcryptjs");
const passport = require("passport");
const validator = require('validator');

// LOAD MODELS
const User = require("../models/User");

exports.getSignupForm = (req, res) => {
  res.render("signup");
};
exports.signupHandler = async(req, res, next) => {
 try{
  let {
    name,
    username,
    email,
    password,
    confirm,
    gender,
    userType,
  } = req.body;
  let errors = [];
  if (
    name.trim().length === 0 ||
    username.trim().length === 0 ||
    email.trim().length === 0 ||
    password.trim().length === 0 ||
    confirm.trim().length === 0 ||
    userType.trim().length === 0 ||
    gender.trim().length === 0
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }
if(!validator.isEmail(email)){
  errors.push({msg: "Email is not valid"});
}
  if (password.length <= 5) {
    errors.push({ msg: "Password must be greater than five characters" });
  }

  if (password != confirm) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (errors.length > 0) {
    res.render("signup", {
      errors,
      email,
      name,
      username,
      password,
      confirm,
      userType,
      gender,
    });

    // res.redirect('back')
  } else {
   let founduser = await User.findOne({ email: email })
      errors.push({ msg: "A user with that email already exist" });
      if (founduser) {
        res.render("signup", {
          errors,
          email,
          name,
          username,
          password,
          confirm,
          userType,
          gender,
        });
      } else {
       email = email.toLowerCase();
        let newUser = new User({
          email,
          name,
          password,
          username,
          userType,
          gender,
        });
      await  bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, async(err, hashed) => {
            newUser.password = hashed;
        await newUser.save()
                req.flash(
                  "success_msg",
                  "Congrats! You are now a registered member"
                )
                passport.authenticate("local", {
                  successRedirect: "/dashboard",
                  failureRedirect: "/login",
                  failureFlash: true,
                })(req, res, next);
              
          });
        });
      }
  }
} catch (error) {
  return new AppError(error.message, error.status);
}
};
exports.login = (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "back",
      failureRedirect: "back",
      failureFlash: true,
    })(req, res, next);
  }