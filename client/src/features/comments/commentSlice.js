import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://gamerz-adobe.onrender.com"

const initialState = {
    commentsArray : [],
    status : 'idle',
    error : null
}

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId) => {
    const response = await axios.get(`${BASE_URL}/api/v1/comments/${postId}`)
    return response.data
})

export const addNewComment = createAsyncThunk('comments/addNewComment', async (commentObj) => {
    const response = await axios.post("${BASE_URL}/api/v1/comments/addNewComment", commentObj)
    return response.data
})

// export const updateComment = createAsyncThunk('Comments/updatePosts', async (comment) => {
//     const response = await axios.patch("${BASE_URL}/api/v1/comments/updateLikes", comment)
//     return response.data
// })


export const deleteComment = createAsyncThunk('Comments/deleteComment', async (commentId) => {
    const response = await axios.delete(`${BASE_URL}/api/v1/comments/${commentId}`)
    return response.data
})


const commentSlice = createSlice({
    name : "Comments",
    initialState,
    reducers : {
        removeComments : (state, action) => {
            state.commentsArray = []
            state.status = 'idle'
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchComments.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.status = "succeded",
            state.commentsArray = action.payload
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        // .addCase(updateComment.fulfilled, (state, action) =>{
        //     // const {_id} = action.payload.Comment
        //     // const Comments = state.commentsArray.filter(reac => reac._id !== _id)
        //     // state.commentsArray = [...Comments, action.payload.Comment]
        // })
        .addCase(addNewComment.fulfilled, (state, action) => {
            state.commentsArray.push(action.payload)
        })
        .addCase(deleteComment.fulfilled, (state, action) => {
            return
        })
    }
})

export const {removeComments} = commentSlice.actions
export const selectAllComments = (state) => state.comments.commentsArray
export const commentListStatus = (state) => state.comments.status

export default commentSlice.reducer
