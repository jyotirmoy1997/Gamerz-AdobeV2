import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    reactionsArray : [],
    status : 'idle',
    error : null
}

export const fetchReactions = createAsyncThunk('reactions/fetchReactions', async () => {
    const response = await axios.get("http://localhost:5000/api/v1/reactions/getAllReactions")
    return response.data
})

export const addNewReaction = createAsyncThunk('reactions/addNewReaction', async (postId) => {
    const response = await axios.post("http://localhost:5000/api/v1/reactions/createReactions", 
    {post : postId})
    return response.data
})

export const updateReaction = createAsyncThunk('reactions/updatePosts', async ({postId, user, type}) => {
    if(type === "like"){
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateLikes", {
            post : postId,
            user
        })
        return response.data
    }
    else if(type === "heart"){
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateHearts", {
            post : postId,
            user
        })
        return response.data
    }
    else if(type === "rocket"){
        const response = await axios.patch("http://localhost:5000/api/v1/reactions/updateRockets", {
            post : postId,
            user
        })
        return response.data
    }
})


export const deleteReaction = createAsyncThunk('reactions/deleteReaction', async (postId) => {
    console.log("Delete Reaction", postId)
    const response = await axios.delete(`http://localhost:5000/api/v1/reactions/deleteReaction/${postId}`)
    return response.data
})


const reactionSlice = createSlice({
    name : "Reactions",
    initialState,
    reducers : {
        removeReactions : (state, action) => {
            state.reactionsArray = []
            state.status = 'idle'
        }
    },
    extraReducers : (builder) => {
        builder.addCase(fetchReactions.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchReactions.fulfilled, (state, action) => {
            state.status = "succeded",
            state.reactionsArray = action.payload.reactions
        })
        .addCase(fetchReactions.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(updateReaction.fulfilled, (state, action) =>{
            const {_id} = action.payload.reaction
            const reactions = state.reactionsArray.filter(reac => reac._id !== _id)
            state.reactionsArray = [...reactions, action.payload.reaction]
        })
        .addCase(addNewReaction.fulfilled, (state, action) => {
            console.log(action.payload.reaction)
            state.reactionsArray.push(action.payload.reaction)
        })
        .addCase(deleteReaction.fulfilled, (state, action) => {
            return
        })
    }
})

export const {removeReactions} = reactionSlice.actions
export const selectAllReactions = (state) => state.reactions.reactionsArray
export const reactionListStatus = (state) => state.reactions.status

export default reactionSlice.reducer
