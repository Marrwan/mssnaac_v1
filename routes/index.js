const express = require("express");
const { isLoggedIn, isAdmin } = require("../auth/auth");
const index = require("../controllers");
const AppError = require("../utilities/appError");

var router = express.Router();

// GET-ROUTE : Get home page. 
router.get("/", index.getHomepage);

//  GET-ROUTE : Logout user.
router.get("/logout", index.logout);

//  GET-ROUTE : Get about page.
router.get("/about", (req, res) => {
  res.render("about"); 
});
//  GET-ROUTE : Get about page.
router.get("/back", (req, res) => {
  res.redirect("..");
});
//  GET-ROUTE : Get admin signup page.
router.get("/admin", (req, res) => {
  res.render("adminsignup");
});

// GET-ROUTE : programmes page
router.get("/programmes", (req, res) => {
  res.render("programmes");
});
// GET-ROUTE : contact page
router.get("/contact", (req, res) => {
  res.render("contact");
});
// GET-ROUTE : executives page
router.get("/executives",index.getExecutives);
router.post("/executives/new", isLoggedIn, isAdmin, index.newExecutivesHandler);

// GET-ROUTE : extramural page
router.get("/extramural", (req, res) => {
  res.render("extramural");
});


// facebook
router.get("/facebook", (req, res) => {
  res.redirect("https://www.facebook.com/MSSNAAC/");
});
// Twitter
router.get("/twitter", (req, res) => {
  res.redirect("https://twitter.com/mssnaac");
});
// Instagram
router.get("/instagram", (req, res) => {
  res.redirect("https://www.instagram.com/aacmssn/");
});
// Whatsapp
router.get("/whatsapp", (req, res) => {
  res.redirect("https://wa.me/+2348073302821");
});

module.exports = router;
