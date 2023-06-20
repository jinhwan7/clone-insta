import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../shared/api"

const initialState = {
  loginSocial:{},
  isLoading: false,
  error: null,
};


export const __userOauthGoogle = createAsyncThunk(
  "oauth/USER_OAUTH_GOOGLE",
  async (payload, thunkAPI) => {
    try{
      const data = await api.post(`auth/google`, { payload })
      .then((res)=>{
        //console.log('🔒 구글 로그인 res : ', res)
        //console.log('🔒 구글 로그인 res.headers : ', res.headers)
        //console.log('🔒 구글 로그인 res.headers.authorization : ', res.headers.authorization)
        //console.log('🔒 구글 로그인 res.data.nickname : ', res.data.nickname)
        const accessToken = res.headers.authorization;
        const refreshToken = res.headers.refreshtoken;
        const nickname = res.data.nickname;
        //console.log('🔒 구글 로그인 res.headers.authorization : ', res.headers.authorization)
        //유저 토큰 + 닉네임이 있다면 가져온 후 세팅
        if(accessToken && refreshToken && nickname){
          localStorage.setItem("token", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("nickname", nickname);
        }else{
          alert('인증 오류! 다시 시도해주세요!')
          return window.location.assign("/");
        }
        //유저 토큰 + 닉네임 가져오기
        const accessTokenGet = localStorage.getItem("token");
        const refreshTokenGet = localStorage.getItem("refreshToken");
        const nicknameGet = localStorage.getItem("nickname");
        if(accessTokenGet && refreshTokenGet && nicknameGet){
          alert('소셜로그인 인증 완료!')
          window.location.assign("/main");
        }else{
          alert('연결 오류! 다시 시도해주세요!')
          return window.location.assign("/");
        }
        return res
      })
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      window.location.assign("/");
      return thunkAPI.rejectWithValue(error)
    }
  }
);





export const __userOauthKakao = createAsyncThunk(
  "oauth/USER_OAUTH_KAKAO",
  async (payload, thunkAPI) => {
    try{
      const data = await api.post(`auth/kakao`, {payload})
      .then((res)=>{
        //console.log('🔒 카카오 로그인 res : ', res)
        //console.log('🔒 카카오 로그인 res.headers : ', res.headers)
        //console.log('🔒 카카오 로그인 res.headers.authorization : ', res.headers.authorization)
        //console.log('🔒 카카오 로그인 res.data.nickname : ', res.data.nickname)
        const accessToken = res.headers.authorization;
        const refreshToken = res.headers.refreshtoken;
        const nickname = res.data.nickname;
        
        //유저 토큰 + 닉네임이 있다면 가져온 후 세팅
         if(accessToken && refreshToken && nickname){
           localStorage.setItem("token", accessToken);
           localStorage.setItem("refreshToken", refreshToken);
           localStorage.setItem("nickname", nickname);
         }else{
           //console.log('🔒 카카오 로그인 res 2 : ', res)
           alert('인증 오류! 다시 시도해주세요!')
            return window.location.assign("/");
         }
         //유저 토큰 + 닉네임 가져오기
         const accessTokenGet = localStorage.getItem("token");
         const refreshTokenGet = localStorage.getItem("refreshToken");
         const nicknameGet = localStorage.getItem("nickname");
         if(accessTokenGet && refreshTokenGet && nicknameGet){
           alert('소셜로그인 인증 완료!')
           window.location.assign("/main");
         }else{
           alert('연결 오류! 다시 시도해주세요!')
           return window.location.assign("/");
         }
         return res
      })
      return thunkAPI.fulfillWithValue(data)
    }catch(error){
      window.location.assign("/");
      return thunkAPI.rejectWithValue(error)
    }
  }
);




const userOauth = createSlice({
  name: "userOauth",
  initialState,
  reducers: {
  },
  extraReducers: {
    //카카오
    [__userOauthKakao.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__userOauthKakao.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.kakao = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      //console.log('state.kakao : ' , state.kakao)
    },
    [__userOauthKakao.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
    //구글
    [__userOauthGoogle.pending]: (state) => {
      state.isLoading = true; // 네트워크 요청이 시작되면 로딩상태를 true로 변경
    },
    [__userOauthGoogle.fulfilled]: (state, action) => {
      state.isLoading = false; // 네트워크 요청이 끝났으니, false로 변경
      state.google = action.payload; // Store에 있는 state.data에 서버에서 가져온 action.payload 추가
      //console.log('state.kakao : ' , state.kakao)
    },
    [__userOauthGoogle.rejected]: (state, action) => {
      state.isLoading = false; // 에러가 발생했지만, 네트워크 요청이 끝났으니, false로 변경
      state.error = action.payload; // catch 된 error 객체를 state.error에 추가
    },
  },
});

// 액션크리에이터는 컴포넌트에서 사용하기 위해 export 하고
export const {} = userOauth.actions;
// reducer 는 configStore에 등록하기 위해 export default 합니다.
export default userOauth.reducer;