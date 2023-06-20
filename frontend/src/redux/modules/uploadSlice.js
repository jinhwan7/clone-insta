import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../shared/api";

export const __getPostThunk = createAsyncThunk(
  "GET_POST",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.get(`posts`);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __addPostThunk = createAsyncThunk(
  "ADD_POST",
  async (payload, thunkAPI) => {
    try {
      //console.log("upload payload:payload", payload);
      await api.post(
        `posts`, 
        payload, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      // .then(()=>{
      //   //window.location.reload()
      // })
      return thunkAPI.fulfillWithValue(payload);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __updatePostThunk = createAsyncThunk(
  "UPDATE_POST",
  async (payload, thunkAPI) => {
    try {
      axios.patch(`/main`, payload);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  post: {
    id: 0,
    body: "",
    nickname: "",
    content: "",
  },
  error: null,
  isLoading: false,
  isUploadModal: false,
  isUploadSuccess: false
};

export const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    isUploadModalGlobalAction: (state, action) => {
      state.isUploadModal = action.payload;
    },
    isUploadSuccessAction: (state, action) => {
      state.isUploadSuccess = action.payload;
    },
  },

  extraReducers: {
    [__getPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__getPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__addPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.uploadPost = action.payload;
    },
    [__addPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__addPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__updatePostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { isUploadModalGlobalAction, isUploadSuccessAction } = uploadSlice.actions;
export default uploadSlice.reducer;
