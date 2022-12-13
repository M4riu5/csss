import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const initialState = {
  posts: [],
  popularPosts: [],
  loading: false,
}
// CREATE POST               asynchron action   slice name   
export const createPost = createAsyncThunk('post/createPost', async(params) => {
  try {
    const {data} = await axios.post('/posts', params)
    return data
  } catch (error) {
    console.log(error)
  }
})
// ALL POSTS
export const getAllPosts = createAsyncThunk('post/getAllPosts' , async () => {
  try {
    const {data} = await axios.get('/allposts')
    return data
  } catch (error) {
    console.log('error -->', error);
  }
})
// updt
export const removePost = createAsyncThunk('post/removePost', async(id) => {
  try {
    const {data} = await axios.delete(`/del/${id}`, id)
    return data
  } catch (error) {
    console.log(error)
  }
})
// delete
export const updatePost = createAsyncThunk('post/updatePost', async(uppost) => {
  try {
    const {data} = await axios.put(`/del/${uppost.id}`, uppost)
    return data
  } catch (error) {
    console.log(error)
  }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {},
  extraReducers: {
    // CREATE POST
    /// kai tik iskvieciam funkcija 
    [createPost.pending] : (state) => {
      state.loading = true
    },
    // kada praejo      
    [createPost.fulfilled] : (state, action) => {
      state.loading = false
      state.posts.push(action.payload)
    },
    // jei klaida
    [createPost.rejected] : (state) => {
      state.loading = false
    },



    // get POSTs
    [getAllPosts.pending] : (state) => {
      state.loading = true
    },
    [getAllPosts.fulfilled] : (state, action) => {
      state.loading = false
      // is backo pasiemam paprastus postus
      state.posts = action.payload.posts
      // is backo apsiemam populiarius postus
      state.popularPosts = action.payload.popularPosts
    },
    [getAllPosts.rejected] : (state) => {
      state.loading = false
    },
    // delete POSTs
    [removePost.pending] : (state) => {
      state.loading = true
    },
    [removePost.fulfilled] : (state, action) => {
      state.loading = false 
      // random visus postus kuriu id nesutampa su istrintu postu
      state.posts = state.posts.filter((post)=> post._id !== action.payload.id)
    },
    [removePost.rejected] : (state) => {
      state.loading = false
    },
    // update POSTs
    [updatePost.pending] : (state) => {
      state.loading = true
    },
    [updatePost.fulfilled] : (state, action) => {
      state.loading = false
      // gaunam post id kuris lygus acction payload id
      const index = state.posts.findIndex((post) => post._id === action.payload._id)
      // i state posts pagal idexa pridedam action payload
      state.posts[index] = action.payload
    },
    [updatePost.rejected] : (state) => {
      state.loading = false
    },
  },
})



export default postSlice.reducer