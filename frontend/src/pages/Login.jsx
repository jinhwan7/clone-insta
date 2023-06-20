import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { idCheck, pwCheck } from "../shared/regExp";
import { __loginUser } from "../redux/modules/loginSlice";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { AiFillApple } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiHide, BiShowAlt } from "react-icons/bi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickSignup = () => {
    navigate("/signUp");
  };

  const user = useSelector((state) => state);
  // const isLogin = useSelector((store) => store.user.is_login);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [showPw, setShowPW] = useState(false);

  // const { data, error } = useSelector((state) => state.loginSlice);
  // const state = useSelector((state) => state.loginSlice);
  // console.log("login state : ", state);
  // const [loginState, setLoginState] = useState(false);

  const onSubmitLogin = async (event) => {
    event.preventDefault();
    //console.log("userId는", userId);
    //console.log("userPw는", userPw);
    //유효성 검사
    if (idCheck === false && pwCheck === false) return false;
    const user = {
      // id: Date.now(),
      email: userId,
      password: userPw,
    };
    //console.log("user", user);
    dispatch(__loginUser(user));
  };
  // console.log("help");

  const passwordToggle = () => {
    setShowPW(!showPw);
    // console.log(showPw);
    // alert("되나요?");
  };

  //소셜로그인 영역
  
  const onClickSocialLoginGoogle = () => { //구글 로그인
    const clientId = "580574907066-dstg0rkuoic5m3dicbaami48u7138084.apps.googleusercontent.com"
    const redirectUrl_google = "http://localhost:3000/oauthGoogle"
    const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUrl_google}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`
    window.location.href = GOOGLE_AUTH_URL;
  };
  
  const onClickSocialLoginKakao=()=>{ //카카오 로그인
  //const REDIRECT_URI = 'https://f1rstweb.shop/auth/kakao';
  //const KAKAO_AUTH_URL = "http://f1rstweb.shop/auth/kakao"
    const restApiKey = '1b6507f790effacecbec0df34314f133'
    const redirectUrl = 'http://localhost:3000/oauth'

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${restApiKey}&redirect_uri=${redirectUrl}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <>
      <StContainer>
        <StMain>
          <StLoginImageBox>
            <Link to="/">
              <StLoginImage src="" onClick={() => window.location.reload()} />
            </Link>
          </StLoginImageBox>

          <StForm onSubmit={onSubmitLogin}>
            <StInputWrap>
              <StInput
                type="email"
                placeholder="이메일"
                onChange={(e) => setUserId(e.target.value)}
                value={userId}
                onBlur={() => {
                  idCheck(userId);
                }}
              />
              <StInputIcon>
                <StInput
                  placeholder="비밀번호"
                  type={showPw ? "text" : "password"}
                  onChange={(e) => setUserPw(e.target.value)}
                  value={userPw}
                  onBlur={() => {
                    pwCheck(userPw);
                  }}
                ></StInput>
                <StHideShow>
                  {showPw ? (
                    <BiShowAlt onClick={passwordToggle} />
                  ) : (
                    <BiHide onClick={passwordToggle} />
                  )}
                </StHideShow>
              </StInputIcon>

              <StButton>로그인</StButton>
            </StInputWrap>
          </StForm>
          {/*소셜로그인*/}
          <StSocialButtonWrap>
            <StSocialButton bc="#f7f7f7" onClick={onClickSocialLoginGoogle}>
              <FcGoogle />
            </StSocialButton>
            <StSocialButton bc="yellow" onClick={onClickSocialLoginKakao}>
              <RiKakaoTalkFill />
            </StSocialButton>
            <StSocialButton
              bc="#f7f7f7"
              onClick={() => {
                alert("현재 구현중 입니다");
              }}
            >
              <AiFillApple />
            </StSocialButton>
          </StSocialButtonWrap>
        </StMain>
        <StSignUpBox>
          계정이 없으신가요?
          <span style={{ color: "#3fb3da" }} onClick={onClickSignup}>
            가입하기
          </span>
        </StSignUpBox>
      </StContainer>
    </>
  );
};

const StContainer = styled.div`
  border: 2px solid #d2d2d2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  height: 100vh;
  background-color: #f4f4f4;
`;

const StMain = styled.div`
  border: 2px solid #d2d2d2;
  width: 350px;
  height: 452px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  margin: 10px;
  background-color: white;
`;

const StInputWrap = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const StForm = styled.form``;

const StButton = styled.button`
  border: 1px solid;
  border-radius: 8px;
  width: 268px;
  height: 35px;
  background-color: #298dff;
  color: white;
  font-size: 15px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #3e3ea9;
  }
`;

const StSignUpBox = styled.div`
  border: 2px solid #d2d2d2;
  width: 350px;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  background-color: white;
  & span {
    font-weight: 700;
    cursor: pointer;
  }
`;

const StSocialButtonWrap = styled.div`
  /* border: 1px solid; */
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const StSocialButton = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: 1px 1px 1px 1px lightgray;
  background-color: ${(props) => props.bc};
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  & :hover {
    color: black;
  }
`;

const StInputIcon = styled.div`
  position: relative;
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StInput = styled.input`
  box-sizing: border-box;
  border: 1px solid gray;
  background-color: #f3f3f3;
  width: 268px;
  height: 36px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 8px;
`;

const StHideShow = styled.div`
  position: absolute;
  right: 10px;
  text-align: left;
  cursor: pointer;

  & :hover {
    color: black;
  }
`;

const StLoginImageBox = styled.div`
  /* border: 1px solid red; */
  width: 220px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLoginImage = styled.img.attrs((props) => ({
  src: `${props.src || "images/bistalogo.png"}`,
}))`
  max-width: 100%;
  cursor: pointer;
`;

export default Login;
