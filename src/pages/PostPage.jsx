import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removePost } from '../redux/features/postSlice'
import { toast } from 'react-toastify'
import './postpage.css'
import { BsXOctagonFill, BsPencil, BsFillEyeFill, BsChatLeftTextFill } from "react-icons/bs";
const PostPage = () => {
  const nav = useNavigate()

  const [post, setPost] = useState('')
  const { user } = useSelector((state) => state.auth)

  const params = useParams()

  const dispatch = useDispatch()
  const remove = () => {
    // trinam pagal params id
    dispatch(removePost(params.id))
    nav('/')
    toast('Deleted')
  }


  const fetch = async (req, resp) => {
    const res = await axios.get(`/api/${params.id}`)
    setPost(res.data)
    console.log('res -->', res);
  }
  useEffect(() => {
    fetch()
  }, [])
  return (
    <div className='postpage'>
      <img className='postimg' src={post.imgUlr} alt="" />
      <div className="credentials">
        <div className="authorinfo">
          <div className='author'>Author : {post.username}</div>
          <Moment className='date' date={post.createdAt} format="YYYY/MM/DD" />
        </div>
        <div className='title' >{post.title}</div>
        <p className='posttext'>{post.text}</p>
        <div className='statisticinfo'>
          <BsFillEyeFill /> {post.views}
          <BsChatLeftTextFill /> <p>{post.comments?.lenght || 0}</p>
        </div>
        {user?._id === post.author && (
          <div className='editdeletbtn'>
            <Link to={`/${params.id}/edit`}>
              <BsPencil className='editicon' >
                EDIT
              </BsPencil>
            </Link>
            <BsXOctagonFill className='deleteicon' onClick={remove} >
              DELETE
            </BsXOctagonFill>
          </div>
        )
        }
        <div className='comments'>Comments</div>
      </div>


    </div >
  )
}

export default PostPage