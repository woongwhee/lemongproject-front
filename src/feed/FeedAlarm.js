import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useLoginState} from "../member/LoginContext";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

function FeedAlarm(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true);
    rendering()}

    let {profile}=useLoginState();
    let loginUserNo = profile.userNo;

    const [alarm, setAlarm] = useState([])

    // 알림 가져오기
    useEffect(()=>{
        axios.post('api/feed/replyAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setAlarm(res.data.result)
        })
    },[])
    const rendering=()=>{
        axios.post('api/feed/replyAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setAlarm(res.data.result)
        })
    }


    const [nick, setNick] = useState('')
    let arr = [];
    const proFile = (userNo) => {
        axios.post('api/feed/feedProfile',{
            userNo:userNo
        }).then(function (res){
            // arr.push(res.data.NICK_NAME)
            // console.log(res.data.NICK_NAME)
            setNick(res.data.NICK_NAME)
        })
    }

    const message = () => {
        const result = [];
        for(let i = 0; i<alarm.length; i++){
                result.push(
                    <div key={i}>
                        <div style={{border:"1px solid red"}}>
                            보낸사람 : {alarm[i].sendUser} <br/>
                            댓글내용 : {alarm[i].message}<br/>
                            쓴시간 : {alarm[i].alrAt}<br/>
                            <button onClick={ () => {
                                readAlarm(alarm[i].refNo);
                            }}>알림지우기</button>
                        </div>
                    </div>
                )
        }
        return result;
    }

    const readAlarm = (replyNo) => {
        axios.post('api/feed/replyAlarmRead',{
            userNo : loginUserNo,
            replyNo : replyNo
        }).then((res)=>{
            // console.log(res.data)
            rendering();
        })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {message()}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedAlarm;