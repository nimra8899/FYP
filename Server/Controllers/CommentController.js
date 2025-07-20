// Controllers/commentController.js
import CommentModel from '../Models/commentModel.js'
import UserModel from '../Models/userModel.js'
import mongoose from 'mongoose'

// Create Comment
export const createComment = async (req, res) => {
  try {
    console.log("Creating comment with data:", req.body);
    
    const newComment = new CommentModel(req.body)
    await newComment.save()

    const populatedComment = await newComment.populate('userId', 'firstname lastname profilePicture')

    res.status(200).json(populatedComment)
  } catch (error) {
    console.error('Error creating comment:', error)
    res.status(500).json({ message: 'Failed to create comment', error })
  }
}

// Get comments for a post
export const getCommentsByPost = async (req, res) => {
  const postId = req.params.postId

  try {
    const comments = await CommentModel.find({ postId })
      .populate('userId', 'firstname lastname profilePicture')
      .sort({ createdAt: 1 }) // oldest first

    res.status(200).json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({ message: 'Failed to fetch comments', error })
  }
}

// Update Comment
export const updateComment = async (req, res) => {
  const commentId = req.params.id
  const { userId, text } = req.body

  try {
    const comment = await CommentModel.findById(commentId)
    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Action forbidden' })
    }

    comment.text = text
    await comment.save()

    const updatedComment = await comment.populate('userId', 'firstname lastname profilePicture')

    res.status(200).json(updatedComment)
  } catch (error) {
    console.error('Error updating comment:', error)
    res.status(500).json({ message: 'Failed to update comment', error })
  }
}

// Delete Comment
export const deleteComment = async (req, res) => {
  const commentId = req.params.id
  const { userId } = req.body

  try {
    const comment = await CommentModel.findById(commentId)
    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    if (comment.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Action forbidden' })
    }

    await comment.deleteOne()
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    console.error('Error deleting comment:', error)
    res.status(500).json({ message: 'Failed to delete comment', error })
  }
}
