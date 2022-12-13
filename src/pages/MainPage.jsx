import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopularPosts from '../components/PopularPosts'
import PostItem from '../components/PostItem'
import { getAllPosts } from '../redux/features/postSlice'
import './mainpage.css'
const MainPage = () => {
  const dispatch = useDispatch()
  // gaunam visus postus
  const { posts, popularPost } = useSelector(state => state.post)
  console.log('popular -->', popularPost);
  useEffect(() => {
    dispatch(getAllPosts())
  }, [dispatch])

  if (!posts.length) {
    return (
      <div className="">No posts yet</div>
    )
  }

  return (
    <div className='main'>
      <div className='post'>
        {
          posts?.map((post, x) => {
            return <PostItem key={x} post={post} />
          })
        }
      </div>
      <div className="popular">
        <div>Popular posts</div>
        {
          popularPost?.map((post, x) => (
            <PopularPosts key={x} post={post} />
          ))
        }
      </div>
    </div>
  )
}

export default MainPage