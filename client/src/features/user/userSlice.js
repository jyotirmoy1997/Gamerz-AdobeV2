import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user : {},
    status : 'loggedOut',
    error : null
}

export const signInUser = createAsyncThunk('users/signInUser', async(formData) => {
    const response = await axios.post('http://localhost:5000/api/v1/auth/sign-in', 
            {...formData}, 
            { withCredentials: true })
    return response.data
})

export const logOutUser = createAsyncThunk('users/logOutUser', async() => {
    const response = await axios.post('http://localhost:5000/api/v1/auth/logout', { withCredentials: true })
    console.log("logout", response)
    return response.data
})

const userSlice = createSlice({
    name : "Users",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(signInUser.pending, (state, action) => {
            state.status = "pending"
        })
        .addCase(signInUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.status = "loggedIn"
        })
        .addCase(signInUser.rejected, (state, action) => {
            state.user = action.payload
            state.error = action.error.message
        })
        .addCase(logOutUser.fulfilled, (state, action) => {
            state.user = {}
            state.status = "loggedOut"
        })
    }
})


export const selectUser = (state) => state.users.user
export const userStatus = (state) => state.users.status

export default userSlice.reducer