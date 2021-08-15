const { newCommentHandler } = require('../controllers/comment');
const { isAdmin, isLoggedIn } = require("../auth/auth");

const router = require('express').Router();
router
.route('/:slug/new')
.post(newCommentHandler)

module.exports = router;