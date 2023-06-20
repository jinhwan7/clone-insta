import axios from "axios";

export const api = axios.create({
  baseURL: "https://f1rstweb.shop/",
  timeout: 1000,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    //"Accept": "application/json," 주석 이유 : 기본 값이 application/json
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    try {
      if (token && refreshToken) {
        config.headers.authorization = token;
        config.headers.refreshauthorization = refreshToken;
        //config.headers.AccessToken = token
        //config.headers.RefreshToken = refreshToken
      }
      //console.log("요청 성공! ", config);
      //console.log("요청 성공! token :  ", token);
      //console.log("요청 성공! refreshToken : ", refreshToken);
      return config;
    } catch (error) {
      alert("서버 요청 에러! 다시 시도해주세요!");
    }
    return config;
  },
  function (error) {
    
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  function (response) {
    //console.log("응답 성공! ", response);

    return response;
  },

  function (error) {
    alert("서버 응답 에러! 다시 시도해주세요!");
    return Promise.reject(error);
  }
);

// 생성한 인스턴스를 익스포트 합니다.
export default api
