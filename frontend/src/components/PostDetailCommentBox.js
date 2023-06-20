import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../style/styleGlobal';
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import ButtonDefault from './ButtonDefault';
import { __commentsGet, } from '../redux/modules/commentsSlice';
import { __commentsAdd } from '../redux/modules/postDetailSlice';


function PostDetailCommentBox({id, likes, createAt}) {


  const commentRef=useRef()
  const dispatch=useDispatch()

  //모달 상태
  const isGlobalModalPostDetail=useSelector((state)=>state.postDetailSlice.isGlobalModalPostDetail)
  
  //댓글 인풋
  const [commentValue, setCommentValue]=useState("")

  const onSubmitPostCommnet=(e)=>{ //댓글 게시
    e.preventDefault()
    const newComment={
      id,
      comment: commentValue,
    }
    dispatch(__commentsAdd(newComment))
    setCommentValue("")
  }

  

  useEffect(()=>{ //모달 오픈시 댓글 입력 인풋 포커스
    isGlobalModalPostDetail && commentRef.current.focus()
  },[isGlobalModalPostDetail])

  return (
        <StPostDetailCommentBox>
          <StPostDetailCommentBoxTop>
            <StPostDetailCommentIconBox>
              <FaRegHeart/>
              <HiOutlinePaperAirplane/>
            </StPostDetailCommentIconBox>
            <StPostDetailCommentLikeTotal>좋아요 {likes}개</StPostDetailCommentLikeTotal>
            <StMainPostItemDateBlock>{createAt}</StMainPostItemDateBlock>
          </StPostDetailCommentBoxTop>
          <StPostDetailCommentInputBox onSubmit={onSubmitPostCommnet}>
            <StPostDetailCommentInput 
            value={commentValue}
            onChange={(e)=>{setCommentValue(e.target.value)}}
            ref={commentRef} required />
            <ButtonDefault width="100px" bgColor={COLORS.defaultLemon} hoverBgColor={COLORS.defaultBold}>입력</ButtonDefault>
          </StPostDetailCommentInputBox>
        </StPostDetailCommentBox>
  )
}



const StPostDetailCommentInput=styled.input.attrs({
  type:`text`,
  placeholder:`댓글 달기...`,
})`
  width: calc(80% - 22px);
  border: none;
  padding: 14px 10px;
`
const StPostDetailCommentInputBox=styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-top: 10px;
  column-gap: 5px;
  padding: 5px;
`
const StMainPostItemDateBlock=styled.span`
  display: block;
  margin-top: 10px;
  color: #aaa;
  font-size: 14px;
`
const StPostDetailCommentLikeTotal=styled.span`
  display: inline-block;
  margin-top: 10px;
  font-weight: bold;
  font-size: 12px;
`
const StPostDetailCommentBoxTop=styled.div`
  border-bottom:1px solid #e2e2e2;
  padding: 10px;
`
const StPostDetailCommentIconBox=styled.div`
  display: flex;
  justify-content: flex-start;
  column-gap: 10px;
  
`
const StPostDetailCommentBox=styled.div`
  height: 153px;
`
export default PostDetailCommentBox