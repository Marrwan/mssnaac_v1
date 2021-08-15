const { isAdmin, isLoggedIn } = require("../auth/auth");
const { newCategoryHandler, editCategoryHandler, deleteCategoryHandler } = require("../controllers/category")

const router = require("express").Router()

router.post("/new",isLoggedIn ,isAdmin ,newCategoryHandler)
router.delete("/:title/delete" ,isLoggedIn ,isAdmin , deleteCategoryHandler)

module.exports = router;

