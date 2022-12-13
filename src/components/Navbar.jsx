import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth, logout } from '../redux/features/authSlice'
import { toast } from 'react-toastify'
import './navbar.css'
import logo from '../imgs/logo.png'
const Navbar = () => {
  const isAuth = useSelector(checkAuth)
  const dispatch = useDispatch()

  const logoutHandler = () => {
    dispatch(logout())
    // REMMOVINAM TOKENA jei logout
    window.localStorage.removeItem('token')
    toast('You logged out')
  }

  return (
    <div className='nav'>
      <img src={logo} className="logos" alt="" />
      <div className='links'>
        {
          isAuth &&
          <ul className='ul'>
            <li className='li'>
              <Link to={'/'} className='link' href="">
                Home
              </Link>
            </li>
            <li className='li'>
              <NavLink to={'/posts'} className='link' href="">
                My post
              </NavLink>
            </li>
            <li className='li'>
              <NavLink to={'/new'} className='link' href="">
                Add post
              </NavLink>
            </li>
          </ul>
        }

        {isAuth ? (
          <button className='button-28' onClick={logoutHandler}>Logout</button>
        ) : (<Link to={'/login'}>
          <button className='button-28'>Login</button>
        </Link>)}
      </div>

    </div>
  )
}

export default Navbar