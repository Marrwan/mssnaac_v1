const { newCategoryHandler, editCategoryHandler, deleteCategoryHandler } = require("../controllers/category")

const router = require("express").Router()

router.post("/new", newCategoryHandler)
router.patch("/:title/edit", editCategoryHandler)
router.delete("/:title/delete" , deleteCategoryHandler)

module.exports = router;