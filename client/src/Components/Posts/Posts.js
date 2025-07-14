import React, { useEffect } from 'react'
import './Posts.css'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { getTimelinePosts } from '../../actions/PostAction'
import { useParams } from 'react-router-dom'

import { PostsData } from '../Data/PostsData'


const Posts = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.authReducer.authData)
  let { posts, loading } = useSelector((state) => state.postReducer)

  useEffect(() => {
    dispatch(getTimelinePosts(user._id))
  }, [dispatch, user._id])

  // If no backend posts found, use default dummy data
  const finalPosts = !loading && posts.length === 0 ? PostsData : posts

  // Filter by userId in params if needed
  const filteredPosts = params.id
    ? finalPosts.filter((post) => post.userId === params.id)
    : finalPosts

  return (
    <div className="Posts">
      {loading ? (
        'Fetching Posts...'
      ) : (
        filteredPosts.map((post, id) => (
          <Post data={post} key={id} />
        ))
      )}
    </div>
  )
}

export default Posts
