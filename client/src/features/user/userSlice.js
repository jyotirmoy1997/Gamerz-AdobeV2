import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user : {},
    status : 'loggedOut',
    error : null
}

export const signInUser = createAsyncThunk('users/signInUser', async(formData) => {
    try{
        const response = await axios.post('http://localhost:5000/api/v1/auth/sign-in', 
        {...formData}, { withCredentials: true })
        return response.data
    }
    catch(error){
        return error.response
    }
})

export const updateUser = createAsyncThunk('users/updateUser', async(formData) => {
    try{
        const response = await axios.patch('http://localhost:5000/api/v1/users/updateUser', 
        {...formData}, { withCredentials: true })
        return response.data
    }
    catch(error){
        return error.response
    }
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
        builder.addCase(signInUser.fulfilled, (state, action) => {
            if(action.payload.status === 404){
                state.user = {}
                state.error = action.payload.data.msg
                state.status = "loggedOut"
            }
            else{

                state.user = action.payload.user
                state.status = "loggedIn"
                state.error = null;
            }
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.error = action.error.message
        })
        .addCase(signInUser.rejected, (state, action) => {
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
export const userError = (state) => state.users.error

export default userSlice.reducer