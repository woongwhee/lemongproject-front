import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FeedReplyInsert from "./FeedReplyInsert";
import "./FeedReply.css"
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FeedDelete from "./FeedDelete";
import FeedDetailView from "./FeedDetailView";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import axios from "axios";

function FeedReply({Feed}) {
    // let feedNo = props.feedNo;
    const [show, setShow] = useState(false);
    const [replyCount, setReplyCount] = useState(false);

    // useEffect(()=>{
    //     axios.post('api/feed/countReply',{
    //         feedNo:feedNo
    //     }).then(function (res){
    //         console.log(res.data);
    //     })
    // },[])

    return (
        <>
            <IconButton aria-label="add to favorites" onClick={() => setShow(true)}>
                <ChatBubbleOutlineIcon />댓글
            </IconButton>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-70w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        댓글 입니다
                    </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        <FeedReplyInsert Feed={Feed} setReplyCount={setReplyCount}/>
                        {/*<FeedDetailView Feed={Feed}></FeedDetailView>*/}
                    </Modal.Body>
            </Modal>
        </>
    );
}

export default FeedReply;