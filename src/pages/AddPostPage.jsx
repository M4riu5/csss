import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/postSlice'
import './addpostpage.css'
const AddPostPage = () => {

  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const nav = useNavigate()
  const submitHandler = () => {
    try {
      const data = new FormData()
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)
      dispatch(createPost(data))
      console.log('data -->', data);
      nav('/')
    } catch (error) {
      console.log('error -->', error);
    }
  }

  return (
    <div className='addpost'>
      <img className='imgprew' src={image} alt="" />
      <form className='addform' action="submit"
        onSubmit={(e) => e.preventDefault()}
      >

        Add Image:
        <input className='input' value={image} onChange={e => setImage(e.target.value)} type="text" />
        Post title:
        <input className='input' value={title} onChange={e => setTitle(e.target.value)} type="text" />
        Post text:
        <textarea className='textarea' rows='20' cols='100' onChange={e => setText(e.target.value)} type="text" />
        <div >
          <button onClick={submitHandler} >Add post</button>
        </div>
      </form>
    </div>
  )
}

export default AddPostPage