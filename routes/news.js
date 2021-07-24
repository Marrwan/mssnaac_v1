const express = require("express");
const { isLoggedIn, isAdmin, isStudent } = require("../auth/auth");
const news = require("../controllers/news");

var router = express.Router();

//  NEWS ROUTE
router.get("/", news.getHomepage)

router
  .route("/new")
  //  GET-ROUTE : Get form to add new  news.
  .get(isLoggedIn, isAdmin, news.getNewForm)
  // CREATE-ROUTE : adds new news.
  .post(isLoggedIn, isAdmin, news.newHandler);

router
  .route("/:slug")
  // SHOW-ROUTE : show specific news
  .get(news.getSpecificNews);
  
  
router
  .route("/:slug/edit")
  // EDIT-ROUTE : shows form to edit specific news
  .get(isLoggedIn, isAdmin, news.getEditNewsForm)
  //  EDIT-ROUTE : edit a specific news.
  .put(isLoggedIn, isAdmin, news.editNewsHandler);
//  DELETE-ROUTE : deletes a specific news
router.delete("/:slug/delete", isLoggedIn, isAdmin, news.deleteNews);
  
 
router.get('/alfaaedah', (req,res)=>{res.redirect('http://alfaaedahpress.wordpress.com')})

module.exports = router;
