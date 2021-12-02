const express = require("express");
const { isLoggedIn, isAdmin, isStudent } = require("../auth/auth");
const blog = require("../controllers/blog");

var router = express.Router();

//  Blog ROUTE
router.get("/", blog.getHomepage)

router
  .route("/new")
  //  GET-ROUTE : Get form to add new  blog.
  .get(isLoggedIn, isAdmin, blog.getNewForm)
  // CREATE-ROUTE : adds new blog.
  .post(isLoggedIn, isAdmin, blog.newHandler);

router
  .route("/:slug")
  // SHOW-ROUTE : show specific blog
  .get(blog.getSpecificBlog);
  
  
router
  .route("/:slug/edit")
  // EDIT-ROUTE : shows form to edit specific blog
  .get(isLoggedIn, isAdmin, blog.getEditBlogForm)
  //  EDIT-ROUTE : edit a specific blog.
  .put(isLoggedIn, isAdmin, blog.editBlogHandler);
//  DELETE-ROUTE : deletes a specific blog
router.delete("/:slug/delete", isLoggedIn, isAdmin, blog.deleteBlog);
  
 
router.get('/alfaaedah', (req,res)=>{
  res.redirect('http://alfaaedahpress.wordpress.com')
})

module.exports = router;
