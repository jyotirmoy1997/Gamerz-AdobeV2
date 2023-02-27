import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    postsArray : [],
    status : 'idle',
    error : null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get("http://localhost:5000/api/v1/posts")
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost) => {
    const response = await axios.post("http://localhost:5000/api/v1/posts", newPost)
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePosts', async ({postId, formData}) => {
    console.log(formData)
    const response = await axios.patch(`http://localhost:5000/api/v1/posts/${postId}`, formData)
    return response.data
})

export const deletePost = createAsyncThunk('posts/deletePosts', async (postId) => {
    console.log(postId)
    const response = await axios.delete(`http://localhost:5000/api/v1/posts/${postId}`)
    console.log(response.data)
    return response.data
})


const postSlice = createSlice({
    name : "Posts",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeded",
            // console.log(action.payload)
            state.postsArray = action.payload
        })
        .addCase(fetchPosts.rejected, (state, action) =>{
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
            state.postsArray.push(action.payload)
        })
        .addCase(updatePost.fulfilled, (state, action) => {
            state.postsArray.push(action.payload)
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            return
        })
    }
})

export const selectAllPosts = (state) => state.posts.postsArray

export default postSlice.reducer