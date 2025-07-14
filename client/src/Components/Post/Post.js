import React, { useState } from 'react'
import './Post.css'
import Comment from '../../Img/comment.png'
import Like from '../../Img/like.png'
import Notlike from '../../Img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData)

  const initialLiked = data.likes?.includes
    ? data.likes.includes(user._id)
    : data.liked || false

  const initialLikes = data.likes?.length ?? data.likes ?? 0

  const [liked, setLiked] = useState(initialLiked)
  const [likes, setLikes] = useState(initialLikes)

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handleCommentClick = () => {
    console.log('Comment button clicked for post:', data._id)
    // You can open a modal, redirect to comments page, or toggle a comment section
  }

  return (
    <div className="Post">
      {data.image && (
        <img
          src={
            data.image.startsWith('data:') || data.image.startsWith('blob:')
              ? data.image
              : process.env.REACT_APP_PUBLIC_FOLDER + data.image
          }
          alt="Post content"
        />
      )}

      <div className="postReact">
        <img
          src={liked ? Like : Notlike}
          alt="Like"
          className={liked ? 'liked' : ''}
          onClick={handleLike}
        />
        <img
          src={Comment}
          alt="Comment"
          onClick={handleCommentClick}
          style={{ cursor: 'pointer' }}
        />
      </div>

      <span className="likeCount">{likes} likes</span>

      <div className="detail">
        <span>
          <b>{data.name ?? 'User'}</b>
        </span>
        <span>{data.desc}</span>
      </div>
    </div>
  )
}

export default Post
