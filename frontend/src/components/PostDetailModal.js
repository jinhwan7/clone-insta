import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../style/styleGlobal";
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import { AiOutlineCloseCircle } from "react-icons/ai";

import ButtonDefault from '../components/ButtonDefault';
import { isGlobalModalPostDetailAction } from '../redux/modules/postDetailSlice';
import PostDetailCommentBox from './PostDetailCommentBox';
import PostDetailContent from './PostDetailContent'
import PostDetailContentAll from './PostDetailContentAll';
import { __commentsGet } from '../redux/modules/commentsSlice';




function PostDetailModal({id, content, nickname, image, createAt, likes, updateAt, myPost, comment}) {

  const dispatch=useDispatch()

  const isGlobalModalPostDetail=useSelector((state)=>state.postDetailSlice.isGlobalModalPostDetail)

  const onClickModalClose=()=>{ //모달 닫기
    dispatch(isGlobalModalPostDetailAction(false))
  }

  const createAtSlice = createAt?.slice(0, 10) //날짜 형식 가공

  //댓글 전체 조회
  //const commnets=useSelector((state)=>state.commentsSlice.comments)
  //console.log('댓글 조회 : ', commnets)

  const commnets=comment

  //useEffect(()=>{ //댓글 전체 조회
  //  dispatch(__commentsGet(id))
  //},[dispatch])
  

  return (
    <StPostDetailModalWrap display={!isGlobalModalPostDetail ? "none" : "flex"}>
      <StPostDetailContentBox>
        <StPostDetailImageBox>
          <StPostDetailImage src={image} />
        </StPostDetailImageBox>
        <StPostDetailInfoBox>
          <StPostDetailInfoBoxSection>
            <StPostDetailUserInfo>
              <Link
                to="/main"
                title="피드 방문하기"
                className="linkPostDetailUserInfo"
              >
                <StPostDetailThumb src="" />
                <StPostDetailNick>{nickname}</StPostDetailNick>
                <StMainPostItemDate>{createAtSlice}</StMainPostItemDate>
              </Link>
            </StPostDetailUserInfo>
            <StPostDetailContentCommentBox>
              {/* 작성자 */}
              <PostDetailContent
              key={id}
              id={id}
              nickname={nickname} 
              content={content} 
              createAt={createAtSlice} 
              myPost={myPost}
              />
              {/* 전체 댓글 */}
              {commnets?.map((comment)=>{
                //console.log('댓글 조회 comment ', comment)  
                return (
                  <PostDetailContentAll 
                  key={comment.id} 
                  id={comment.id}
                  nickname={comment.nickname} 
                  content={comment.comment}
                  createAt={comment.createdAt || "날짜 구현 중"}
                  myComment={comment.myComment}
                  />
                )
              })}

            </StPostDetailContentCommentBox>

            <PostDetailCommentBox id={id} likes={likes} createAt={createAtSlice}/>
          </StPostDetailInfoBoxSection>
        </StPostDetailInfoBox>
      </StPostDetailContentBox>
      <AiOutlineCloseCircle
        className="iconClose modal"
        onClick={onClickModalClose}
      />
      <StPostDetailContentBoxDim
        onClick={onClickModalClose}
      ></StPostDetailContentBoxDim>
    </StPostDetailModalWrap>
  );
}
const StMainPostItemDate = styled.span`
  margin-left: 8px;
`;
const StPostDetailNick = styled.span`
  font-weight: bold;
`;
const StPostDetailContentCommentBox = styled.div`
  padding: 0 20px 20px;
  height: 564px;
  max-height: 564px;
  overflow-y: auto;
  border-bottom: 1px solid #e2e2e2;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 10px;
  }
`;
const StPostDetailThumb = styled.img.attrs((props) => ({
  src: `${props.src || "images/logo.png"}`,
}))`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid ${COLORS.defaultGray};
`;
const StPostDetailUserInfo = styled.div`
  border-bottom: 1px solid #e2e2e2;
  padding: 10px 20px;
`;
const StPostDetailInfoBoxSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;
const StPostDetailInfoBox = styled.div`
  height: calc(100% - 20px);
  flex-basis: 40%;
`;
const StPostDetailImage = styled.img.attrs((props) => ({
  src: `${props.src || "images/logo.png"}`,
}))`
  max-width: 100%;
  max-height: 400px;
  min-width: 100px;
  min-height: 200px;
`;
const StPostDetailImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-basis: 60%;
  border-right: 1px solid ${COLORS.defaultGrayLight};
  background-color: #000;
`;
const StPostDetailContentBoxDim = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
const StPostDetailContentBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 65%;
  min-width: 550px;
  max-width: 1600px;
  height: 84%;
  min-height: 400px;
  max-height: 1800px;
  border: 3px solid ${COLORS.defaultGrayLight};
  border-radius: 5px;
  position: relative;
  z-index: 2;
  background-color: #fff;
`;
const StPostDetailModalWrap = styled.div`
  display: ${(props) => props.display};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
`;

export default PostDetailModal;
