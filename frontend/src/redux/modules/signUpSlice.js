import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../shared/api";

const initialState = {
  user: {},
  isLoading: false,
  error: null,
  is_signup: false,
};

export const __signUp = createAsyncThunk(
  "signUp",
  async (payload, thunkAPI) => {
    try {
      const data = await api
        .post(`users/signup`, payload)
        .then((res) => {
          if (res.status === 201) {
            // const token = res.headers.authorization;
            // const refreshToken = res.headers.refreshauthorization;
            // localStorage.setItem("token", token);
            // localStorage.setItem("refreshToken", refreshToken);
            // console.log("회원가입", res);
            alert("sign up success");
            window.location.assign("/");
            return res;
          }
        })
        .catch((err) => {
          alert("다시 확인해주세요.");
          return err;
        });
      //console.log("sign up data", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      alert("다시 확인해주세요.");
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {},
  extraReducers: {
    [__signUp.pending]: (state) => {
      state.isLoading = true;
    },
    [__signUp.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      //console.log("회원가입 state.users", state.users);
      //console.log("회원가입 action payload", action.payload);
      state.isLoginOk = true;
    },
    [__signUp.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      //console.log("state err", state.error);
      state.isLoginOk = false;
      state.users = null;
    },
  },
});

export const {} = signUpSlice.actions;
export default signUpSlice.reducer;
