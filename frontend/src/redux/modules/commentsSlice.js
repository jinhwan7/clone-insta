import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../shared/api"
import { useSelector } from 'react-redux';

const initialState = {
  comments:[],
  isLoading: false,
  error: null,
};



export const __commentsGet = createAsyncThunk(
  "posts/COMMENTS_GET",
  async (payload, thunkAPI) => {
    try{
      const {data} = await api.get(`comments/${payload}`)
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);




const commentsSlice = createSlice({
  name: "commentsGet",
  initialState,
  reducers: {
    isGlobalModalPostDetailAction : (state, action)=>{
      state.isGlobalModalPostDetail = action.payload
    }
  },
  extraReducers: {
    [__commentsGet.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__commentsGet.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.comments = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      //console.log('commentsGet state.comments : ', state.posts)
      //console.log('commentsGet action.payload : ', action.payload)
    },
    [__commentsGet.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = commentsSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default commentsSlice.reducer;