import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './FeedInsert.css'
import FeedPictureInsert from "./FeedPictureInsert";

import {Paper, Stack, TextField} from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';


function FeedInsert() {

    const [userNo, SetUserNo] = useState();
    const [content, SetContent] = useState("");

    const [insertPhotoNo, setInsertPhotoNo] = useState([]);

    const [disable, setDisalbe] = useState(true);
    const containContent = (e) => {
        e ? setDisalbe(false) : setDisalbe(true)
    }
    useEffect(()=>{
        if(content === "" || insertPhotoNo.length === 0){
            setDisalbe(true);
        }

    })
    const checkContent = (insertFail) => {
        if (insertFail === "Fail") {
            return alert("내용입력은 필수 입니다.")
        }
    }

    return (
        <div style={{marginLeft:"100px", width:"60%"}}>
             <FeedPictureInsert setInsertPhotoNo={setInsertPhotoNo}></FeedPictureInsert>
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
                    <Paper elevation={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="New Content"
                            multiline
                            rows={10}
                            onChange={(e) => {
                                SetContent(e.target.value);
                                containContent(e);
                            }}
                            sx={{width: "100%", height: "400px", marginTop: "10px"}}
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
                                        userNo: userNo,
                                        feedContent: content,
                                        photoNo: insertPhotoNo
                                    }).then(function (res) {
                                        console.log(res.data);
                                        window.location.reload();
                                    }).catch(function (res) {
                                        checkContent(res.data.Java);
                                        console.log('실패함' + userNo, content, res.data.Java)
                                    })
                                }}
                    >전송</Button>

            </div>
    );

}


export default FeedInsert;