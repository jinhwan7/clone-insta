// src/redux/config/configStore.js
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "../modules/loginSlice";
import signUpSlice from "../modules/signUpSlice";
import postsMainSlice from "../modules/postsMainSlice";
import postDetailSlice from "../modules/postDetailSlice";
import commentsSlice from "../modules/commentsSlice";
import userOauth from "../modules/user";
import uploadSlice from "../modules/uploadSlice";

const store = configureStore({
  reducer: {
    loginSlice,
    signUpSlice,
    postsMainSlice,
    postDetailSlice,
    commentsSlice,
    userOauth,
    uploadSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
export default store;
