import React, { useEffect, useState } from 'react'
import './CommentModal.css'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments } from '../../actions/CommentAction'

const CommentModal = ({ postId, onClose }) => {
  const dispatch = useDispatch()
  const { comments } = useSelector((state) => state.commentReducer)
  const { user } = useSelector((state) => state.authReducer.authData)

  const [commentText, setCommentText] = useState('')

  useEffect(() => {
    dispatch(getComments(postId))
  }, [dispatch, postId])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!commentText.trim()) return

    const newComment = {
      userId: user._id,
      postId,
      comment: commentText.trim(),
    }

    dispatch(createComment(newComment))
    setCommentText('')
  }
console.log('Comments:', comments)
  return (
    <div className="comment-modal-backdrop" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comment-modal-header">
          <h3>Comments</h3>
          <span className="close-btn" onClick={onClose}>
            &times;
          </span>
        </div>

        <div className="comment-modal-body">
          {comments?.length > 0 ? (
            comments.map((c) => (
              <div key={c._id} className="comment-item">
                <b>{c.userId?.firstname || 'User'}:</b> {c.comment}
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default CommentModal
