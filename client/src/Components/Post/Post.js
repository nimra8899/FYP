import React, { useState } from 'react'
import './Post.css'
import Comment from '../../Img/comment.png'
import Like from '../../Img/like.png'
import Notlike from '../../Img/notlike.png'
import { useSelector } from 'react-redux'
import { likePost } from '../../api/PostRequest'
import CommentModal from '../CommentModal/CommentModal'


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData)

  const initialLiked = data.likes?.includes
    ? data.likes.includes(user._id)
    : data.liked || false

  const initialLikes = data.likes?.length ?? data.likes ?? 0

  const [liked, setLiked] = useState(initialLiked)
  const [likes, setLikes] = useState(initialLikes)
  const [showCommentModal, setShowCommentModal] = useState(false)

const handleCommentClick = () => {
  setShowCommentModal(true)
}

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  // const handleCommentClick = () => {

  //   console.log('Comment button clicked for post:', data._id)
  // }

  const mediaBasePath = process.env.REACT_APP_PUBLIC_FOLDER || ''

  return (
    <div className="Post">
       <div className="detail">
        <span className="span-class">
          <img className='avatar'
            src={
              data.userId?.profilePicture
                ? mediaBasePath + data.userId.profilePicture
                : mediaBasePath + 'defaultProfile.png'
            }
            alt="User"></img>
          <b>
            {data.userId?.firstname
              ? `${data.userId.firstname} ${data.userId.lastname}`
              : 'User'}
          </b>
        </span>
        <span className="span-text">{data.desc}</span>
      </div>
      {/* Render Images */}
      {Array.isArray(data.images) &&
        data.images.map((imgSrc, index) => (
          <img
            key={`img-${index}`}
            src={
              imgSrc.startsWith('data:') || imgSrc.startsWith('blob:')
                ? imgSrc
                : mediaBasePath + imgSrc
            }
            alt={`post-img-${index}`}
            className="post-media"
          />
        ))}

      {/* Render Videos */}
      {Array.isArray(data.videos) &&
        data.videos.map((videoSrc, index) => (
          <video autoPlay 
            key={`video-${index}`}
            src={
              videoSrc.startsWith('data:') || videoSrc.startsWith('blob:')
                ? videoSrc
                : mediaBasePath + videoSrc
            }
            controls
            className="post-media"
          />
        ))}

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
      {showCommentModal && (
  <CommentModal postId={data._id} onClose={() => setShowCommentModal(false)} />
)}


     
    </div>
  )
}

export default Post
