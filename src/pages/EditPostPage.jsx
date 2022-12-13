import axios from '../utils/axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updatePost } from '../redux/features/postSlice'
import './editpostpage.css'

const EditPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const nav = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()

  const fetch = async () => {
    const res = await axios.get(`/api/${params.id}`)
    setImage(res.data.imgUlr)
    setTitle(res.data.title)
    setText(res.data.text)
    console.log('refefeefs -->', res);
  }

  const submit = () => {
    const updatedPost = new FormData()
    updatedPost.append('title', title)
    updatedPost.append('text', text)
    // post id
    updatedPost.append('id', params.id)
    updatedPost.append('image', image)
    dispatch(updatePost(updatedPost))
    nav('/posts')
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <div className='editpage'>
      <img className='imageedit' src={image} alt="" />
      <form action="submit"
        onSubmit={(e) => e.preventDefault()}
      >

        Image Url
        <input value={image} onChange={e => setImage(e.target.value)} type="text" />


        Post title:
        <input value={title} onChange={e => setTitle(e.target.value)} type="text" />



        Post text:
        <textarea value={text} rows='20' cols='100' onChange={e => setText(e.target.value)} type="text" />

        <div>
          <button className='updatebtn' onClick={submit} >Update</button>
        </div>
      </form>
    </div>
  )
}

export default EditPostPage