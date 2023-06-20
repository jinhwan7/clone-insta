import React from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../style/styleGlobal";
import { HiHome } from "react-icons/hi";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { isUploadModalGlobalAction } from "../redux/modules/uploadSlice";

const SideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickModalOpen = () => {
    dispatch(isUploadModalGlobalAction(true));
  };

  const onClickLogout = () => {
    if (!window.confirm("로그아웃 하시겠습니까?")) {
    } else {
      localStorage.clear('token')
      localStorage.clear('refreshToken')
      localStorage.clear('nickname')
      alert("로그아웃 되었습니다!");
      navigate("/");
      //window.location.href='/'
      
    }
  };
  // 로그인, 회원가입 페이지에서 공통 사이드 메뉴바 숨김처리
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/signUp" ||
    window.location.pathname === "/oauth"
  )
    return null;
  return (
    <StSideNavWrap>
      <StH1>
        <StLogoImg />
      </StH1>
      <StNavMenuBox>
        <StNavMenuItem>
          <Link to="/main" className="linkSideNav">
            <HiHome />
            <StNavMenuItemSpan>홈</StNavMenuItemSpan>
          </Link>
        </StNavMenuItem>
        <StNavMenuItem>
          <Link to="/main" className="linkSideNav">
            <HiOutlinePaperAirplane />
            <StNavMenuItemSpan>메세지</StNavMenuItemSpan>
          </Link>
        </StNavMenuItem>
        <StNavMenuItem>
          <Link to="/main" className="linkSideNav">
            <FaRegHeart />
            <StNavMenuItemSpan>알림</StNavMenuItemSpan>
          </Link>
        </StNavMenuItem>
        <StNavMenuItem onClick={onClickModalOpen}>
          {/* <Link to="/main" className="linkSideNav"> */}
          <Link className="linkSideNav">
            <FiPlusSquare />
            <StNavMenuItemSpan>만들기</StNavMenuItemSpan>
          </Link>
        </StNavMenuItem>
        <StNavMenuItem>
          <Link to="/main" className="linkSideNav">
            <CgProfile />
            <StNavMenuItemSpan>프로필</StNavMenuItemSpan>
          </Link>
        </StNavMenuItem>
        <StNavMenuItemWarning onClick={onClickLogout}>
          <HiOutlineLogout />
          <StNavMenuItemSpan>로그아웃</StNavMenuItemSpan>
        </StNavMenuItemWarning>
      </StNavMenuBox>
    </StSideNavWrap>
  );
};
const StNavMenuItemSpan = styled.span`
  margin-left: 10px;
`;
const StNavMenuItemWarning = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  cursor: pointer;
  :hover {
    color: ${COLORS.defaultWarning};
  }
`;
const StNavMenuItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  cursor: pointer;
  :hover {
    color: ${COLORS.defaultBold};
  }
`;
const StNavMenuBox = styled.ul`
  margin-top: 60px;
`;
const StLogoImg = styled.img.attrs({
  src: `images/logo2.png`,
  alt: "비슷하구만그램 로고",
})`
  width: 90%;
`;
const StH1 = styled.h1`
  width: 100%;
  text-align: center;
  margin-top: 0;
`;
const StSideNavWrap = styled.nav`
  display: flex;
  flex-direction: column;
  width: 250px;
  height: calc(100vh - 40px);
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  background-color: #eee;
`;
export default SideNav;
