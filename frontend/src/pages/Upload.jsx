import React, { useRef, formData, useState, useEffect } from "react";
import styled from "styled-components";
import { RiImageAddFill } from "react-icons/ri";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  __addPostThunk,
  __getPostThunk,
  isUploadModalGlobalAction,
  isUploadSuccessAction
} from "../redux/modules/uploadSlice";

import { __postsMain } from '../redux/modules/postsMainSlice';
import { BsPersonCircle } from "react-icons/bs";

const Upload = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [files, setFiles] = useState("");
  const token = localStorage.getItem("token");
  const nickName = localStorage.getItem("nickname");
  // console.log(token);

  //이미지 미리보기와 파일첨부 기능
  const [imgBase64, setImgBase64] = useState([]); // 파일 base64
  const [imgFile, setImgFile] = useState(null); //파일
  const [content, setContent] = useState();
  // console.log("content", content);

  //let imageGlobalFormData;

 //미리보기
 const [imageSrc, setImageSrc] = useState();
 const encodeFileToBase64 = async (fileBlob) => {
   const reader = new FileReader();
   reader.readAsDataURL(fileBlob);
   return new Promise((resolve) => {
     reader.onload = () => {
       setImageSrc(reader.result);
       resolve();
     };
   });
 };



  const [fileImg, setFileImg] = useState();

  // let formData;
  const formData = new FormData();
  const onChangeFile = (e) => {
    encodeFileToBase64(e.target.files[0]);
    const formImg = e.target.files[0];
    setFileImg(formImg);
    formData.append("file", formImg);
  };


  const modalState = useSelector((state) => state.uploadSlice.isUploadModal);
  const uploadSuccess=useSelector((state)=>state.uploadSlice.isUploadSuccess)

  //디스패치
  const onWriteHandler = async (e) => {
    e.preventDefault();
    formData.append("image", fileImg);
    formData.append("content", content);
    //console.log("dispatch formdata", formData);
    for (const form of formData) {
      //console.log("form 최종", form);
    }
    await dispatch(__addPostThunk(formData))
    .then((res)=>{
      dispatch(isUploadModalGlobalAction(false))
      dispatch(__postsMain())
      //dispatch(isUploadSuccessAction(true))
      //dispatch(isUploadSuccessAction(false))
      //console.log('메인 글 포스트 res : ', res)
      //console.log('메인 글 조회 uploadSuccess : ', uploadSuccess)
    })
  };
  

  return (
    <>
      <StContainer>
        <StBoxWrap>
          <StBoxTop>
            <StStBoxTopInner>
              <AiOutlineArrowLeft
                className="iconUploadTop"
                onClick={() => window.location.reload()}
              />
              <span>새 게시물 올리기</span>
              <div></div>
            </StStBoxTopInner>
          </StBoxTop>

          <StBox>
            <StForm
              onSubmit={(e) => {
                onWriteHandler(e);
              }}
            >
              <StLeftBox>
                {/* <RiImageAddFill className="iconUpload" /> */}
                <div>
                  {/* <span>사진을 올려보세요</span> */}
                  <StPrivew>
                    {imageSrc && <Stimg src={imageSrc} alt="preview-img" />}
                  </StPrivew>
                  {/* <StInnerBox>
                  
                    {imgBase64.map((item) => {
                      return (
                        <img
                          className="
                      m-auto
                      "
                          key={Date.now()}
                          src={item}
                          alt="First slide"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      );
                    })}
                  </StInnerBox> */}
                </div>
              </StLeftBox>

              <StRightBox>
                <StRightBoxTop>
                  <BsPersonCircle />
                  <span>{nickName}</span>
                </StRightBoxTop>
                <StRightBoxContent>
                  <textarea
                    style={{
                      width: "200px",
                      height: "270px",
                      fontSize: "15px",
                      margin: "3px",
                      padding: "10px",
                      border: "none",
                      textDecoration: "none",
                      outline: "none",
                      resize: "none",
                    }}
                    placeholder="문구 입력..."
                    name="body"
                    rows="19"
                    maxLength={2000}
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                </StRightBoxContent>
                <StRightBoxBt>
                  <StFileBox>
                    <StInput
                      className="uploadInput"
                      type="file"
                      id="image"
                      accept="image/*"
                      onChange={onChangeFile}
                      multiple="multiple"
                    />
                    <StLabel htmlFor="image">사진선택</StLabel>
                    <StButton>공유하기</StButton>
                  </StFileBox>
                </StRightBoxBt>
              </StRightBox>
            </StForm>
          </StBox>
        </StBoxWrap>
      </StContainer>
    </>
  );
};


const Stimg = styled.img`
  width: auto;
  height: auto;
  max-width: 400px;
  max-height: 400px;
`;

const StPrivew = styled.div`
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
`;

const StContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StBoxWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StBoxTop = styled.div`
  border-bottom: 2px solid gray;
  border-radius: 20px 20px 0 0;
  width: 700px;
  height: 42px;
  font-size: 18px;
  font-weight: 500;
`;

const StStBoxTopInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StBox = styled.div`
  border-radius: 0 0 20px 20px;
  width: 700px;
  height: 500px;
  & span {
    font-size: 20px;
    font-weight: 500;
  }
`;

const StForm = styled.form`
  display: flex;
  width: 700px;
  height: 500px;
`;

const StLeftBox = styled.div`
  border-right: 1px solid gray;
  border-radius: 0 0 0 20px;
  width: 500px;
  height: 520px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
`;

const StInnerBox = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  width: 465px;
  height: 490px;
  position: absolute;
`;

const StRightBox = styled.div`
  width: 230px;
`;

const StRightBoxTop = styled.div`
  height: 20px;
  padding: 15px 0 0 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-bottom: 1px solid gray;
  & span {
    font-size: 15px;
    padding-bottom: 5px;
  }
`;

const StRightBoxContent = styled.div`
  height: 300px;
  border-bottom: 1px solid gray;
`;

const StRightBoxBt = styled.div``;

const StButton = styled.button`
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 32px;
  font-size: 15px;
  font-weight: 500;
  background-color: #298dff;
  color: white;
  margin: 5px;
  cursor: pointer;
`;

const StFileBox = styled.div`
  width: 230px;
  height: 100px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StLabel = styled.label`
  border: none;
  border-radius: 10px;
  width: 100px;
  height: 32px;
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  background-color: #298dff;
  color: white;
  cursor: pointer;
  line-height: 33px;
`;

const StInput = styled.input`
  display: none;
`;
export default Upload;
