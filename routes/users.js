var express = require("express");
const passport = require("passport");
const user = require("../controllers/users");

var router = express.Router();

// SIGUP ROUTE
router
  .route("/signup")
  //  GET-ROUTE : Get form to sigup .
  .get(user.getSignupForm)
  // CREATE-ROUTE:  signup handle
  .post(user.signupHandler);

// LOGIN ROUTE
router
.route("/login")
  .get( user.getLogin)
  //  handle user login
  .post(user.login);

router.get('/google', user.getGoogleLogin);
router.get('/google/redirect',passport.authenticate('google'), user.googleRedirect)
module.exports = router;
