import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import FeedPictureInsert from "./FeedPictureInsert";
import Alert from '@mui/material/Alert';
import ButtonM from '@mui/material/Button';
import '../mypage/font/font.css';
import {Paper, Stack, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ButtonR from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import swal from 'sweetalert';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';

import { useLoginState } from "../member/LoginContext";

import { CiBellOn , CiSearch , CiUser , CiHome , CiLogout , CiMedal , CiSquarePlus} from "react-icons/ci";
import {returnFocus} from "react-modal/lib/helpers/focusManager";

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

    let {profile}=useLoginState();
    console.log(profile);
    const userNos = profile?.userNo; // 로그인한 사용자 userNo

    const successAlert = () =>{
        return(
                swal({
                    title: "Feed Insert",
                    text: "피드가 올라갔습니다!",
                    icon: "success",
                    button: "확인",
                }).then(
                    ()=>{setShow(false)}
                )
        )
    }

    return (
        <div className="feed-insert-body">
            <IconButton aria-label="delete" onClick={() => setShow(true)}>
                <AddBoxIcon fontSize="large"/>
            </IconButton>

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
                                        // console.log(res.data);
                                        {successAlert()}

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