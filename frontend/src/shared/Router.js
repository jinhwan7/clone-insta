import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/Login";
import SignUp from "../pages/signUp";
import Main from "../pages/Main";
import Upload from "../pages/Upload";
import KakaoAuthHandler from '../pages/oauth';
import OauthGoogle from'../pages/oauthGoogle';


// 2. Router 라는 함수를 만들고 아래와 같이 작성합니다.
//BrowserRouter를 Router로 감싸는 이유는,
//SPA의 장점인 브라우저가 깜빡이지 않고 다른 페이지로 이동할 수 있게 만들어줍니다!
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/main" element={<Main />} />
          <Route path="/oauth" element={<KakaoAuthHandler />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/oauthGoogle" element={<OauthGoogle />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};
export default Router;
