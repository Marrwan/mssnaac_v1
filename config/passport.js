const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const AppError = require('../utilities/appError')
const googleStrategy = require('passport-google-oauth20').Strategy
//Load User Model
const User = require("../models/User");

module.exports.serializeDeserializeUser = (passport) =>{
   passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}
module.exports.passportLocalConfig = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User
      email = email.toLowerCase();
      User.findOne({ email: email })
        .then((user) => {
          if (!user) {
            return done(null, false, {
              message: "That email is not registered",
            });
          }
          //Match password
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Password Incorrect" });
            }
          });
        })
        .catch((err) => AppError(err));
    })
  );
 
};

module.exports.passportGoogleConfig = (passport) =>{
 
  passport.use( new googleStrategy({
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: "/google/redirect"
    }, async(accessToken, refreshToken, profile, cb)=>{
        try {
            let user = await User.findOne({googleId: profile.id})
            if(user){
               return cb(null, user)
            }
      
      let newUser = await new User({
          email: profile.emails[0].value,
          username: profile.displayName,
          googleId : profile.id,
      }).save()  
  return cb(null, newUser)
          } catch (error) {
            AppError(error.message,error.status);
        }
    } ))
}