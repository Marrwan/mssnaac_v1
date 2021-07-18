const express = require("express");
const { isLoggedIn, isAdmin, isStudent } = require("../auth/auth");
const news = require("../controllers/news");

var router = express.Router();

// MSSN NEWS ROUTE

router
  .route("/mssn")
  //  GET-ROUTE : Get mssn news page.
  .get(news.getMSSNNews);
router
  .route("/mssn/new")
  //  GET-ROUTE : Get form to add new mssn news.
  .get(isLoggedIn, isAdmin, news.getNewMSSNForm)
  // CREATE-ROUTE : adds new mssnnews.
  .post(isLoggedIn, isAdmin, news.newMSSNHandler);
router
  .route("/mssn/:slug")
  // SHOW-ROUTE : show specific mssn news
  .get(news.getSpecificMSSN);
router
  .route("/mssn/:slug/edit")
  // EDIT-ROUTE : shows form to edit specific mssn news
  .get(isLoggedIn, isAdmin, news.getEditMSSNForm)
  //  EDIT-ROUTE : edit a specific mssn news.
  .put(isLoggedIn, isAdmin, news.editMSSNHandler);
//  DELETE-ROUTE : deletes a specific mssn news
router.delete("/mssn/:slug/delete", isLoggedIn, isAdmin, news.deleteMSSN);
// =============================================================

// ACADEMICS NEWS ROUTE

router
  .route("/academics")
  //  GET-ROUTE : Get academics news page.
  .get(news.getAcademicNews);
router
  .route("/academics/new")
  //  GET-ROUTE : Get form to add new mss ews.
  .get(isLoggedIn, isAdmin, news.getNewAcademicForm)
  // CREATE-ROUTE : adds ew academicnews.
  .post(isLoggedIn, isAdmin, news.newAcademicHandler);
router
  .route("/academics/:slug")
  // SHOW-ROUTE : show specific academic news
  .get(news.getSpecificAcademic);
router
  .route("/academics/:slug/edit")
  // EDIT-ROUTE : shows form to edit specific academic news
  .get(isLoggedIn, isAdmin, news.getEditAcademicForm)
  //  EDIT-ROUTE : edit a specific academic news.
  .put(isLoggedIn, isAdmin, news.editAcademicHandler);
//  DELETE-ROUTE : deletes a specific mssn news
router.delete(
  "/academics/:slug/delete",
  isLoggedIn,
  isAdmin,
  news.deleteAcademic
);

// SCHOLARSHIP NEWS ROUTE

router
  .route("/scholarship")
  //  GET-ROUTE : Get scholarship news page.
  .get(news.getScholarshipNews);
router
  .route("/scholarship/new")
  //  GET-ROUTE : Get form to add new mss ews.
  .get(isLoggedIn, isAdmin, news.getNewScholarshipForm)
  // CREATE-ROUTE : adds ew scholarshipnews.
  .post(isLoggedIn, isAdmin, news.newScholarshipHandler);
router
  .route("/scholarship/:slug")
  // SHOW-ROUTE : show specific scholarship news
  .get(news.getSpecificScholarship);
router
  .route("/scholarship/:slug/edit")
  // EDIT-ROUTE : shows form to edit specific scholarship news
  .get(isLoggedIn, isAdmin, news.getEditScholarshipForm)
  //  EDIT-ROUTE : edit a specific scholarship news.
  .put(isLoggedIn, isAdmin, news.editScholarshipHandler);
//  DELETE-ROUTE : deletes a specific scholarship news
router.delete(
  "/scholarship/:slug/delete",
  isLoggedIn,
  isAdmin,
  news.deleteScholarship
);

router.get('/alfaaedah', (req,res)=>{res.redirect('http://alfaaedahpress.wordpress.com')})
module.exports = router;
