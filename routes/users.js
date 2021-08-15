var express = require("express");
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
  //  handle user login
  .post(user.login);

module.exports = router;
