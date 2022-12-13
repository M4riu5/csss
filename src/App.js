import {Routes, Route, BrowserRouter} from 'react-router-dom'
import MainPage from './pages/MainPage'
import PostPage from './pages/PostPage'
import PotstsPage from './pages/PostsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import EditPostPage from './pages/EditPostPage'
import AddPostPage from './pages/AddPostPage'
import NavBar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getMe } from './redux/features/authSlice'

function App() {
  const dispatch = useDispatch()
  // keikviena page tikrins ar yra pas useri tokenas
  useEffect(()=> {
    dispatch(getMe())
  },[dispatch])
  return (
    <>
    <BrowserRouter>
        <NavBar/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/posts' element={<PotstsPage/>}/>
        <Route path='/:id' element={<PostPage/>}/>
        <Route path='/new' element={<AddPostPage/>}/>
        <Route path='/:id/edit' element={<EditPostPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
      </Routes>
      <ToastContainer position='bottom-right'/>
    </BrowserRouter>
    </>
  );
}

export default App;
