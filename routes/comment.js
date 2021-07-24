const { newCommentHandler, getNewCommentForm } = require('../controllers/comment');


const router = require('express').Router();
router.route('/:slug/new')
.get(getNewCommentForm)
.post(newCommentHandler)

module.exports = router;