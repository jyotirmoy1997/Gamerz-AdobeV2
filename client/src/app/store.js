import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import postsReducer from '../features/posts/postSlice';
import userReducer from '../features/user/userSlice';
import reactionReducer from '../features/reactions/reactionSlice';
import commentReducer from "../features/comments/commentSlice"
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  posts: postsReducer,
  users: userReducer,
  reactions: reactionReducer,
  comments : commentReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware : [thunk],
  devTools: false
});

export const persistor = persistStore(store);

export const resetReduxState = () => {
  persistor.purge();
}