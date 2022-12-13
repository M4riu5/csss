import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkAuth, loginUser } from '../redux/features/authSlice'
import './loginpage.css'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { status } = useSelector(state => state.auth)
  const isAuth = useSelector(checkAuth)
  console.log(status)
  const dispatch = useDispatch()
  const nav = useNavigate()
  useEffect(() => {
    if (status) toast(status)
    if (isAuth) nav('/')
  }, [status, isAuth, nav])

  const handleSubmit = () => {
    dispatch(loginUser({ username, password }))
    setPassword('')
    setUsername('')
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        <h1>Login</h1>
        <label className='text-xs text-gray-400'>
          Username:
          <input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder='Username' />
        </label>
        <label >
          Password:
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' />
        </label>
        <div>
          <button onClick={handleSubmit} type='submit' >Login</button>
        </div>
        <Link to={'/register'} >Sign up Now!</Link>
      </form>
    </div>
  )
}

export default LoginPage