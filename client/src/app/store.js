import { configureStore } from "@reduxjs/toolkit"
import postsReducer from "../features/posts/postSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
    reducer : {
        posts : postsReducer,
        users : userReducer
    }
})