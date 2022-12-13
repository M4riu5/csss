import React from 'react'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import './postitem.css'
import { BsFillEyeFill, BsChatLeftTextFill } from "react-icons/bs";
const PostItem = ({ post }) => {

  if (!post) {
    return <div >No posts yet</div>
  }
  return (
    <Link to={`/${post._id}`}>
      <div className='postCard' >
        <div >
          <img src={post.imgUlr} className='postmainimage' alt="" />
        </div>

        <div className='author'>
          <div className='username'>Author : {post.username}</div>
          <div className='date'>
            <Moment date={post.createdAt} format="YYYY/MM/DD" />
          </div>
        </div>
        <div className="posttitle">{post.title}</div>
        <p className='posttext'>{post.text}</p>

        <div className="comsandviews">
          <p className=''>
            <BsFillEyeFill />{post.views}
          </p>
          <p className=''>
            <BsChatLeftTextFill />  {post.comments?.lenght || 0}
          </p>
        </div>

      </div >
    </Link>
  )
}

export default PostItem