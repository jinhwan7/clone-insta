// 리다이렉트 URI 화면
import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __userOauthKakao } from '../redux/modules/user';

const KakaoAuthHandler = (props) => {

  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");

  //console.log('❗❗❗ oauth 페이지 code : ', code)

  useEffect(()=>{ //백엔드로 쿠키 토큰 전송
    dispatch(__userOauthKakao(code))
  },[])


  return (
    <>
      <Wrap>
        <StLoadingText>사용자 인증하는 중 🔒</StLoadingText>
        <StInfiniteRotatingLogo>⏳</StInfiniteRotatingLogo>
      </Wrap>
    </>
  )
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  background-color: #fffcdc;
`
const StLoadingText=styled.div`
  margin-bottom: 50px;
`
const StInfiniteRotatingLogo=styled.div`
  font-size: 40px;
  text-align: center;
  box-sizing: border-box;
  animation: rotate_image 1.5s linear infinite;
  transform-origin: 50% 50%;
  @keyframes rotate_image{
  100% {
      transform: rotate(360deg);
    }
  }
`



export default KakaoAuthHandler;