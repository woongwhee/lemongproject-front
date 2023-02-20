import React, {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useLoginState} from "../member/LoginContext";
import axios from "axios";
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import {IconButton} from "@mui/material";
import Badge from "@mui/material/Badge";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Tab from '@mui/material/Tab';
import FavoriteIcon from '@mui/icons-material/Favorite';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import Paper from '@mui/material/Paper';
import "./FeedAlarm.css"

function FeedAlarm(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {setShow(true);
    replyRendering()}

    let {profile}=useLoginState();
    let loginUserNo = profile.userNo;

//====================================================================
//     const [get, sett] = useState();
//     const proFile = (userNo) => {
//         axios.post('api/feed/feedProfile',{
//             userNo:userNo
//         }).then(function (res){
//             // console.log(res.data);
//             sett(res.data.NICK_NAME);
//         })
//     }
//====================================================================
    // 댓글 알림 가져오기
    const [replyAlarm, setReplyAlarm] = useState([])
    useEffect(()=>{
        axios.post('api/feed/replyAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setReplyAlarm(res.data.result)
        })
    },[])

    const replyRendering=()=>{
        axios.post('api/feed/replyAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setReplyAlarm(res.data.result)
        })
    }
    // --------------------------------------------------------
    const replyMessage = () => {
        const result = [];
        for(let i = 0; i<replyAlarm.length; i++){
            // proFile(replyAlarm[i].sendUser)
            result.push(
                <div key={i} style={{width:"100%"}}>
                    <div style={{border:"1px solid #dcdcdc", width:"350px", float:"left",marginTop:"5px"}}>
                        <Paper elevation={16}>
                        <div>보낸사람 : </div>
                        <div style={{textOverflow:"ellipsis", overflow:"hidden",whiteSpace:"nowrap"}}>댓글내용 : {replyAlarm[i].message}</div>
                        <div>{replyAlarm[i].alrAt}</div>
                        </Paper>
                    </div>
                    <div style={{float:"right", marginTop:"20px"}}>
                        <IconButton aria-label="delete" onClick={ () => {
                            replyAlarmRead(replyAlarm[i].refNo);}}>
                            <HighlightOffIcon fontSize="medium"/>
                        </IconButton>
                    </div>
                </div>
            )
        }
        return result;
    }
    // --------------------------------------------------------
    //    댓글 알람읽기
        const replyAlarmRead = (replyNo) => {
            axios.post('api/feed/replyAlarmRead',{
                userNo : loginUserNo,
                replyNo : replyNo
            }).then((res)=>{
                console.log(res.data)
                replyRendering();
                replyAlarmCount();
            })
        }
//====================================================================
//====================================================================
    // 좋아요 알림 가져오기
    const [heartAlarm, setHeartAlarm] = useState([])
    useEffect(()=>{
        axios.post('api/feed/heartAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setHeartAlarm(res.data.result)
        })
    },[])
    const heartRendering=()=>{
        axios.post('api/feed/heartAlarmList',{
            userNo:loginUserNo
        }).then(function (res){
            // console.log(res.data.result)
            setHeartAlarm(res.data.result)
        })
    }
    //-------------------------------------------------------
    const HrMessage=()=>{
        const result = []
        for(let i = 0; i<heartAlarm.length; i++){
            // proFile(heartAlarm[i].sendUser)
            result.push(
                <div key={i} style={{width:"100%"}}>
                    <div style={{border:"1px solid #dcdcdc", width:"350px", float:"left",marginTop:"5px"}}>
                        <Paper elevation={16}>
                        <div> 님이 {heartAlarm[i].message} </div>
                        <div>{heartAlarm[i].alrAt}</div>
                        </Paper>
                    </div>
                    <div style={{float:"right", marginTop:"10px"}}>
                        <IconButton aria-label="delete"
                                    onClick={() => { readHeartAlarm(heartAlarm[i].refNo); }}
                        >
                            <HighlightOffIcon fontSize="medium"/>
                        </IconButton>
                    </div>
                </div>
            )
        }
        return result;
    }
//     --------------------------------------------------------
//     좋아요 알림읽기
    const readHeartAlarm = (feedNo) => {
        axios.post('api/feed/heartAlarmRead',{
            userNo : loginUserNo,
            feedNo : feedNo
        }).then((res)=>{
            console.log(res.data)
            heartRendering();
            replyAlarmCount();
        })
    }
//====================================================================
    const [alCount, setAlCount] = useState();
    useEffect(()=>{
        axios.post('api/feed/replyAlarmCount',{
            userNo : loginUserNo
        }).then((res)=>{
            setAlCount(res.data)
        })
    },[])
    const replyAlarmCount = () =>{
        axios.post('api/feed/replyAlarmCount',{
            userNo : loginUserNo
        }).then((res)=>{
            setAlCount(res.data)

        })
    }
//====================================================================
    const clearAlarm = () => {
        axios.post('api/feed/clearAlarm',{
            userNo : loginUserNo
        }).then((res)=>{
            replyRendering();
            heartRendering();
            replyAlarmCount();
        })
    }
//====================================================================
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <IconButton aria-label="delete" onClick={handleShow}>
                <Badge badgeContent={alCount} color="primary">
                    <NotificationsNoneOutlinedIcon fontSize="large" />
                </Badge>
            </IconButton>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Feed Alarm</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab icon={<ChatBubbleIcon />} label="COMMENT" value="1"/>
                                <Tab icon={<FavoriteIcon />} label="LIKE" value="2"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div className="replyMessage" >
                                {replyMessage()}
                            </div>
                        </TabPanel>
                        <TabPanel value="2">
                            <div className="replyMessage">
                                {HrMessage()}
                            </div>
                        </TabPanel>
                    </TabContext>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="outline-success" onClick={()=>{clearAlarm()}}>
                        CLEAR
                    </Button>
                    <Button variant="dark" onClick={handleClose}>
                        CLOSE
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default FeedAlarm;