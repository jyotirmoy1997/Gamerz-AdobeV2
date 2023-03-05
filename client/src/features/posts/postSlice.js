import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addNewReaction } from "../reactions/reactionSlice";
import { deleteReaction } from "../reactions/reactionSlice";


const initialState = {
    postsArray : [],
    status : 'idle',
    error : null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get("http://localhost:5000/api/v1/posts")
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (newPost, {dispatch}) => {
    const response = await axios.post("http://localhost:5000/api/v1/posts", newPost)
    const postId = response.data
    dispatch(addNewReaction(postId))
    return response.data
})

export const updatePost = createAsyncThunk('posts/updatePosts', async ({postId, formData}) => {
    const response = await axios.patch(`http://localhost:5000/api/v1/posts/${postId}`, formData)
    return response.data
})

export const deletePost = createAsyncThunk('posts/deletePosts', async (postId, {dispatch}) => {
    const response = await axios.delete(`http://localhost:5000/api/v1/posts/${postId}`)
    dispatch(deleteReaction(postId))
    return response.data
})


const postSlice = createSlice({
    name : "Posts",
    initialState,
    reducers : {
        removePosts : (state, action) => {
            state.status = 'idle'
            state.postsArray = []
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeded",
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
            const {_id} = action.payload.reaction
            const reactions = state.reactionsArray.filter(reac => reac._id !== _id)
            state.reactionsArray = [...reactions, action.payload.reaction]
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            return
        })
    }
})


export const {removePosts} = postSlice.actions
export const selectAllPosts = (state) => state.posts.postsArray
export const postListStatus = (state) => state.posts.status

export default postSlice.reducer