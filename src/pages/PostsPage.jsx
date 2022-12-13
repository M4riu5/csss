import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import PostItem from '../components/PostItem'
import './postspage.css'
const PostsPage = () => {
  const [posts, setPost] = useState([])
  const fetchMyPosts = async () => {
    const { data } = await axios.get('/me')
    console.log('data -->', data);
    setPost(data)
  }
  useEffect(() => {
    fetchMyPosts()
  }, [])
  return (
    <div className='myposts'>
      {posts?.map((post, x) => {
        return <PostItem post={post} key={x} />
      })}
    </div>
  )
}

export default PostsPage