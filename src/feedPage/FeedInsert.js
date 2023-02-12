import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import FeedPictureInsert from "./FeedPictureInsert";

import '../mypage/font/font.css';

import {Paper, Stack, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ButtonR from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useLoginState } from "../Member/LoginContext";

import { CiBellOn , CiSearch , CiUser , CiHome , CiLogout , CiMedal , CiSquarePlus} from "react-icons/ci";

function FeedInsert() {

    const [userNo, SetUserNo] = useState();
    const [content, SetContent] = useState("");

    const [insertPhotoNo, setInsertPhotoNo] = useState([]);

    const [disable, setDisable] = useState(true);
    const containContent = (e) => {
        e ? setDisable(false) : setDisable(true)
    }
    useEffect(()=>{
        if(content === "" || insertPhotoNo.length === 0){
            setDisable(true);
        }

    })
    const checkContent = (insertFail) => {
        if (insertFail === "Fail") {
            return alert("내용입력은 필수 입니다.")
        }
    }
    // const [fullscreen, setFullscreen] = useState(true);
    const [show, setShow] = useState(false);
    // function handleShow(breakpoint) {
    //     setFullscreen(breakpoint);
    //     setShow(true);
    // }

    let {profile}=useLoginState();
    console.log(profile);
    const userNos = profile?.userNo; // 로그인한 사용자 userNo

    return (
        <div className="feed-insert-body">
            <br/><br/>
            {/* 피드 게시물 작성 */}
            <br></br>
            <button class="btn btn-dark" style={{fontSize:'23px' , marginTop:'-95px' , border:'0' , borderRadius:'0'
                            , marginLeft:'15px' , fontFamily:'NanumGothic-Regular'}} onClick={() => setShow(true)}>
                {/* <ButtonR className="me-2 mb-2" onClick={() => setShow(true)}>
                    피드 게시물 작성
                </ButtonR> */}
                피드 작성
            </button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>FeedInsert</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="feed-photo-insert">
                        <FeedPictureInsert setInsertPhotoNo={setInsertPhotoNo}></FeedPictureInsert>
                    </div>

                    {/*<div>*/}
                    {/*    {insertPhotoNo}*/}
                    {/*</div>*/}
                    <Paper elevation={24} style={{marginTop:"30px"}}>
                        <TextField
                            id="outlined-multiline-static"
                            label="New Content"
                            multiline
                            rows={10}
                            onChange={(e) => {
                                SetContent(e.target.value);
                                containContent(e);
                            }}
                            sx={{width: "100%", height: "400px", marginTop: "50px"}}
                        />
                    </Paper>
                    <TextField
                        id="standard-multiline-flexible"
                        label="아이디 입력"
                        multiline
                        maxRows={4}
                        variant="standard"
                        onChange={(e) => {
                            SetUserNo(e.target.value);
                        }}
                    />
                    <br/>
                    <Button style={{float:"right"}}
                            disabled={disable}
                            variant="outlined"
                            endIcon={<SendIcon />}
                            onClick={
                                () => {
                                    axios.post('api/feed/insert', {
                                        userNo: userNos,
                                        feedContent: content,
                                        photoNo: insertPhotoNo
                                    }).then(function (res) {
                                        console.log(res.data);
                                        window.location.reload();
                                    }).catch(function (res) {
                                        checkContent(res.data.Java);
                                        console.log('실패함' + userNos, content, res.data.Java);
                                    })
                                }}
                    >전송</Button>
                </Modal.Body>
            </Modal>
        </div>



    );

}


export default FeedInsert;