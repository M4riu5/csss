import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { checkAuth, registerUser } from '../redux/features/authSlice'
import { toast } from 'react-toastify'
import './registerpage.css'
const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passrepeat, setPassrepeat] = useState('')
  const { status } = useSelector(state => state.auth)
  console.log(status)
  const dispatch = useDispatch()
  const nav = useNavigate()
  const isAuth = useSelector(checkAuth)
  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) nav('/login')
  }, [status, isAuth, nav])

  const handleSubmit = () => {
    dispatch(registerUser({ username, password, passrepeat }))
    setPassword('')
    setUsername('')
    setPassrepeat('')
  }
  return (
    <div>
      <form className='regform' onSubmit={e => e.preventDefault()}>
        <h1>Register</h1>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder='Username' />
        Password:
        <input type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder='Password' />
        Repeat password:
        <input type="password" onChange={e => setPassrepeat(e.target.value)} value={passrepeat} placeholder='Reapet password' />
        <div>
          <button onClick={handleSubmit} type='submit'>Register</button>
        </div>
        <Link to={'/login'}>Have account ?</Link>
      </form>
    </div>
  )
}

export default RegisterPage