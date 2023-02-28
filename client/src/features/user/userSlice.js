import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user : {},
    status : 'loggedOut',
    error : null
}


const userSlice = createSlice({
    name : "Users",
    initialState,
    reducers : {
        addUser : (state, action) =>{
            state.user = action.payload
            state.status = 'loggedin'
        }
    }
})

export const { addUser } = userSlice.actions

export const selectUser = (state) => state.users.user

export default userSlice.reducer