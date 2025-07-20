// Routes/CommentRoute.js
import express from 'express'
import {
  createComment,
  getCommentsByPost,
  updateComment,
  deleteComment
} from '../Controllers/CommentController.js'

const router = express.Router()

router.post('/', createComment)
router.get('/:postId', getCommentsByPost)
router.put('/:id', updateComment)
router.delete('/:id', deleteComment)

export default router
