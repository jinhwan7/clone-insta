import React, { useState } from "react";
import Modal from "react-modal";
import Upload from "../pages/Upload";
import styled from "styled-components";
// import { FiPlusSquare } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { isUploadModalGlobalAction } from "../redux/modules/uploadSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { notInitialized } from "react-redux/es/utils/useSyncExternalStore";

const UploadModal = () => {
  const dispatch = useDispatch();
  const modalState = useSelector((state) => state.uploadSlice.isUploadModal);

  //리듀서 활용 useState 지역스코프니까 리듀서는 전역스코프 그래서 modal open 버튼->sideNav.js 쓰려면 전역스코프를 써야함
  //온클릭으로 버튼을 열었을때 setModalOpen
  //console.log("modalState", modalState);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(modalState);

  //
  // const onClickModalOpen = () => {
  //   dispatch(isUploadModalGlobalAction(true));
  //  setModalIsOpen(modalState);
  // };

  const onClickModalClose = () => {
    dispatch(isUploadModalGlobalAction(false));
    // setModalIsOpen(modalState);
  };

  return (
    <>
      {/* <button onClick={() => setModalIsOpen(true)}>열림버튼</button> */}
      {/* <button onClick={onClickModalOpen}>열림버튼</button> */}

      <Modal
        // isOpen={modalIsOpen}
        isOpen={modalState}
        // onRequestClose={() => setModalIsOpen(false)}
        onRequestClose={onClickModalClose}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: "20%",
            right: 0,
            bottom: 0,
            width: "900px",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
          },
          content: {
            position: "absolute",
            border: "2px solid gray",

            width: "700px",
            height: "550px",
            top: "10%",
            left: "10%",
            right: "40px",
            bottom: "30px",
            // border: "1px solid #ccc",
            background: "#fff",
            overflow: "hidden",
            // WebkitOverflowScrolling: "touch",
            overFlow: "hidden",
            borderRadius: "20px",
            outline: "none",
            padding: "0px",
          },
        }}
      >
        <StCloseIcon>
          {/* <AiOutlineCloseCircle onClick={() => setModalIsOpen(false)} /> */}

          <AiOutlineCloseCircle onClick={onClickModalClose} />
        </StCloseIcon>

        <Upload />
      </Modal>
    </>
  );
};

const StCloseIcon = styled.div`
  /* border: 1px solid red; */
  z-index: 1px;
  position: absolute;
  right: 15px;
  top: 13px;
`;

export default UploadModal;
