import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux';

import { COLORS } from '../style/styleGlobal';
import { BiTrash } from "react-icons/bi";
import { BsPencilFill } from "react-icons/bs";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegHeart } from "react-icons/fa";
import ButtonDefault from '../components/ButtonDefault';
import { isGlobalModalPostDetailAction, postDetailAction } from '../redux/modules/postDetailSlice';
import { __postDetail } from '../redux/modules/postDetailSlice';
import { __EditPostMain, __deletePostMain } from '../redux/modules/postsMainSlice';


function PostItem({id, content, nickname, image, createAt, likes, updateAt, commentCount, myPost}) {
  
  const dispatch=useDispatch()

  //모달 상태
  const isGlobalModalPostDetail=useSelector((state)=>
  state.postDetailSlice.isGlobalModalPostDetail)

  

  //수정 영역
  const [isEdit, setIsEdit]=useState(false) //수정 토글 상태
  const [editPostContent, setEditPostContent]=useState(content)

  const onClickPostEdit=()=>{ //수정 토글
    setIsEdit(!isEdit)
  }

  const onClickEditPostMain=()=>{ //글 수정
    console.log('글수정 id : ', id)
    const EditPost={
      id,
      nickname,
      image,
      createAt,
      likes,
      updateAt,
      myPost,
      content:editPostContent
    }
    console.log('EditPost : ', EditPost)
    dispatch(__EditPostMain(EditPost))
    .then(()=>{
      setIsEdit(!isEdit)
    })
    
  }

  const onClickPostDelete=()=>{ //글 삭제
    if(window.confirm('삭제하시겠습니까?')){
      dispatch(__deletePostMain(id))
    }else{
      alert('삭제취소')
    }
  }
  const [modalDetailContent, setModalDetailContent]=useState("")

  // let postDetail=useSelector((state)=>state.postDetail)
  // console.log('postDetail : ' , postDetail)

  const onClickModalPostDetail = ()=>{ //글 상세 모달 열기

    dispatch(__postDetail(id))
    .then((res)=>{
      /*
      console.log("res : ", res)
      console.log("res.payload.id: ", res.payload.id)
      console.log("res.payload.content: ", res.payload.content)
      console.log('!!! modalDetailContent : ', modalDetailContent)
      */
      dispatch(isGlobalModalPostDetailAction(true))
      const newPostDetail={ //글 상세 내용 스토어 저장
        key : res.payload.id,
        id : res.payload.id,
        content : res.payload.content,
        nickname : res.payload.nickname,
        image : res.payload.imageUrl,
        createAt : res.payload.createAt,
        likes : res.payload.likes,
        myPost : myPost,
        comment:res.payload.comment,
      }
      dispatch(postDetailAction(newPostDetail))
    })
    
  }
  const createAtSlice = createAt.slice(0, 10)

  return (
    <>
    <StMainPostItem>
      <StMainPostItemTopInfo>
        <StMainPostItemUserInfo>
          <Link to="/main" title="피드 방문하기" className="flex-align-center">
            <StPostDetailThumb src=""/>
            <StMainPostItemNick>{nickname} ·</StMainPostItemNick>
            <StMainPostItemDate>{createAtSlice}</StMainPostItemDate>
          </Link>
        </StMainPostItemUserInfo>
        <StMainPostItemPostFunction>
          {myPost 
          &&
            <>
              <BsPencilFill onClick={onClickPostEdit} className="iconEdit"/>
              <BiTrash onClick={onClickPostDelete}/>
            </> 
          }
        </StMainPostItemPostFunction>
      </StMainPostItemTopInfo>
      <StMainPostItemImageBox>
        <StMainPostItemImage src={image}/>
      </StMainPostItemImageBox>
      <StMainPostItemBottomInfo>
        <StMainPostItemLikeBox>
          <FaRegHeart/><HiOutlinePaperAirplane/>
        </StMainPostItemLikeBox>
        <StMainPostItemLikeTotal>좋아요 {likes}개</StMainPostItemLikeTotal>
          <StMainPostItemContent>
            <StMainPostItemNickContent>
              <Link to="/main" title="피드 방문하기" className="flex-align-center">
                <StPostDetailThumb/>{nickname}</Link>
            </StMainPostItemNickContent>
            {!isEdit
            ?<>
              <StMainPostItemDescContent>
                {content}
              </StMainPostItemDescContent>
              <ButtonDefault onClick={onClickModalPostDetail}
              bgColor={`${COLORS.defaultLemon}`} hoverBgColor={`${COLORS.defaultBold}`}
              >모두보기</ButtonDefault>
              </> 
            :<>
                <StMainPostItemDescContentEdit autoFocus 
                value={editPostContent}
                onChange={(e)=>{setEditPostContent(e.target.value)}}/>
                <ButtonDefault 
                width="100px"
                bgColor={`${COLORS.defaultBlueLight}`} 
                hoverBgColor={`${COLORS.defaultBold}`}
                onClick={onClickEditPostMain}
                >수정</ButtonDefault>
              </>
            }
          </StMainPostItemContent>
          <StMainPostItemCommentTotal onClick={onClickModalPostDetail}>댓글 {commentCount}개</StMainPostItemCommentTotal>
      </StMainPostItemBottomInfo>
    </StMainPostItem>
    </>
  )
}


const StPostDetailThumb=styled.img.attrs(props=>({
  src:`${props.src || "images/logo.png"}`,
}))`
  width: 30px;
  height:30px;
  border-radius: 30px;
  border: 1px solid ${COLORS.defaultGray};
  margin-right: 10px;
`
const StMainPostItemCommentTotal=styled.span`
  color: ${COLORS.defaultGray};
  cursor: pointer;
`
const StMainPostItemDescContentEdit=styled.textarea`
  width: calc(100% - 10px);
  height: 30px;
  margin: 10px 0;
  padding: 5px;
  border: 1px solid ${COLORS.defaultOrange};
  resize: none;
`
const StMainPostItemDescContent=styled.p`
  max-height: 30px;
  padding: 10px;
  margin-bottom: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 20px;
`
const StMainPostItemNickContent=styled.span`
  font-weight:bold;
  :hover{
    color: ${COLORS.defaultBlueBold}
  }
`
const StMainPostItemContent=styled.div`
`
const StMainPostItemLikeTotal=styled.span`
  font-weight: bold;
`
const StMainPostItemLikeBox=styled.div`
  display: flex;
  column-gap: 5px;
`
const StMainPostItemBottomInfo=styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  row-gap: 14px;
`
const StMainPostItemImage=styled.img.attrs(props=>({
  src:`${props.src || "images/logo.png"}`,
}))`
  max-width: 100%;
  max-height: 400px;
  min-width: 100px;
  min-height: 200px;
`
const StMainPostItemImageBox=styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  background-color: #000;
`
const StMainPostItemDate=styled.span`
  margin-left: 8px;
`
const StMainPostItemNick=styled.span`
font-weight: bold;
`
const StMainPostItemPostFunction=styled.div`
  
`
const StMainPostItemUserInfo=styled.span`
  :hover{
    color: ${COLORS.defaultBlueBold}
  }
`
const StMainPostItemTopInfo=styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`
const StMainPostItem=styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 10px;
  width: 40%;
  max-width: 450px;
  min-width: 240px;
  padding: 10px;
  border-bottom: 1px solid #e2e2e2;
`



export default PostItem