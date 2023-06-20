import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../shared/api"

const initialState = {
  postDetailObj:{},
  isLoading: false,
  error: null,
  isGlobalModalPostDetail : false,
};


export const __postDetail = createAsyncThunk(
  "posts/POST_DETAIL",
  async (payload, thunkAPI) => {
    try{
      const {data} = await api.get(`posts/${payload}`)
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);

//댓글 작성 : 게시글 상세에 댓글이 포함된 db 구조
export const __commentsAdd = createAsyncThunk(
  "posts/COMMENTS_ADD",
  async (payload, thunkAPI) => {
    try{
      //console.log('댓글 payload ', payload)
      const {data} = await api.post(`comments/${payload.id}`, {comment : payload.comment})
      //console.log('댓글 작성 후 data ', data)
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);


//댓글 삭제 : 게시글 상세에 댓글이 포함된 db 구조
export const __commentsDelete = createAsyncThunk(
  "posts/COMMENTS_DELETE",
  async (payload, thunkAPI) => {
    try{
      //console.log('댓글 COMMENTS_DELETE ', payload)
      await api.delete(`comments/${payload}`)
      return thunkAPI.fulfillWithValue(payload)
    }catch(error){
      return thunkAPI.rejectWithValue(error)
    }
  }
);


const postDetailSlice = createSlice({
  name: "postDetail",
  initialState,
  reducers: {
    isGlobalModalPostDetailAction : (state, action)=>{
      state.isGlobalModalPostDetail = action.payload
    },
    postDetailAction:(state, action)=>{
      state.postDetailObj = action.payload
    }
  },
  extraReducers: {
    [__postDetail.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__postDetail.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.postDetail = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      //console.log('state.postDetail : ' , state.postDetail)
    },
    [__postDetail.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
    //댓글 작성
    [__commentsAdd.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__commentsAdd.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      //console.log('댓글 작성 후 조회 state.postDetail.comment : ', state.postDetail.comment)
      //console.log('댓글 작성 후 조회 action.payload : ', action.payload)
      state.postDetail.comment = [
        ...state.postDetail.comment, 
        action.payload
      ]
    },
    [__commentsAdd.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
     //댓글 삭제
     [__commentsDelete.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__commentsDelete.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      //console.log('삭제 state.postDetail.comment : ', state.postDetail.comment)
      state.postDetail.comment = state.postDetail.comment.filter((comment)=>comment.id !== action.payload)

    },
    [__commentsDelete.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {
  isGlobalModalPostDetailAction,
  postDetailAction
} = postDetailSlice.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default postDetailSlice.reducer;