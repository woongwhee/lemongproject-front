import React, {useEffect, useLayoutEffect, useState} from 'react';
import axios from "axios";
import FeedReplyList from "./FeedReplyList";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import ListGroup from 'react-bootstrap/ListGroup';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import CloseButton from "react-bootstrap/CloseButton";
import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
function FeedReplyInsert(props) {

    const Feed = props.Feed;

    const feedNo = props.Feed.feedNo;

    const [replyContent, SetReplyContent] = useState(''); // CONTENT

    const [replyCount, setReplyCount] = useState(0) // REPLY CONTENT

    const [ testStr, setTestStr ] = useState([]);

    props.setReplyCount(replyCount);

    function callback(str) {
        setTestStr(str);
    }

    const deleteReply = async (replyNo, feedNo) => {
        await axios.post('api/feed/deleteReply',
            {
                replyNo:replyNo,
                feedNo:feedNo
            }).then(function (res){
            console.log("삭제 성공")
            getReplyList();
        })
    }
    
    const deleteReplyButton = (replyNo, feedNo, userNo) =>{
        if(Feed.loginUserNo === userNo){
            return(
                <CloseButton onClick={()=>{deleteReply(replyNo,feedNo)}}/>
            )
        }else{
            return(<p></p>)
        }
    }

    // const [profilePath, setProfilePath] = useState();
    // const proFile = (userNo) => {
    //     axios.post('api/feed/feedProfile',{
    //         userNo:userNo
    //     }).then(function (res){
    //         // console.log(res.data.FILEPATH);
    //         setProfilePath(res.data.FILEPATH)
    //     })
    //     return(
    //         <Avatar alt="Remy Sharp" src={profilePath} />
    //     )
    // }

    const replyList2 = () =>{
        const result = [];
        for(let i =0; i<testStr.length; i++){
            result.push((
                <div key={i}>
                    <ListGroup.Item>
                        <div style={{float:"left"}}>
                            <Avatar alt="Remy Sharp" src={testStr[i].filePath} />
                        </div>
                        <div style={{marginLeft:"80px"}}>
                            {testStr[i].nickName} : {testStr[i].replyContent}
                            <div style={{float:"right"}}>
                                {deleteReplyButton(testStr[i].replyNo,feedNo,testStr[i].userNo)}
                            </div>
                            <br/>
                            {testStr[i].replyAt}
                        </div>
                    </ListGroup.Item>
                </div>
            ))
        }
        return result;
    }

    // 댓글 가져오기 
    useEffect(
        () => {
            axios({
                url: '/api/feed/listReply',
                method: 'GET',
                params:{
                    feedNo:feedNo
                }
            }).then((res) => {
                setTestStr(res.data.result) // [7개]
            })
        },[]
    );
    const getReplyList=()=>{
        axios({
            url: '/api/feed/listReply',
            method: 'GET',
            params:{
                feedNo:feedNo
            }
        }).then((res) => {
            // callback(res.data);
            // console.log(res.data.result) // [7개]
            setTestStr(res.data.result) // [7개]
            // console.log(Json.userNo);

        })
    }

    // 댓글 수
    useEffect(
        () => {
            axios({
                url: '/api/feed/countReply',
                method: 'GET',
                params:{
                    feedNo:feedNo
                }
            }).then((res) => {
                // console.log(res.data) // [7개]
                setReplyCount(res.data)
            })
        }, []
    );
    const getReplyCount=()=>{
        axios({
            url: '/api/feed/countReply',
            method: 'GET',
            params:{
                feedNo:feedNo
            }
        }).then((res) => {
            console.log(res.data) // [7개]
            setReplyCount(res.data)
        })
    }
    
    // 댓글 쓰기
    const replyInsert=()=>{
        axios.post('api/feed/insertReply',{
            userNo:props.Feed.loginUserNo,
            feedNo:feedNo,
            replyContent:replyContent
        }).then(function (res){
            SetReplyContent('');
            // window.location.reload("/main");
        }).catch(function (){
            console.log('실패함');
        })
    }

    let i = 0;
    return (
        <>
    <div>
        <div style={{overflow:"scroll", height:"700px"}}>
            <ListGroup variant="flush">
                {replyList2()}
            </ListGroup>
        </div>
        <div>
            {/*<InputGroup className="mb-2" style={{marginTop:"30px"}}>*/}
            {/*    <InputGroup.Text id="inputGroup-sizing-default" placeholder="숫자만입력">*/}
            {/*        아이디*/}
            {/*    </InputGroup.Text>*/}
            {/*    <Form.Control*/}
            {/*        aria-label="Default"*/}
            {/*        aria-describedby="inputGroup-sizing-default"*/}
            {/*        onChange={(e)=> {SetId(e.target.value);}}*/}
            {/*        value={id}*/}
            {/*    />*/}
            {/*</InputGroup>*/}
            {/*<InputGroup className="mb-2" style={{marginTop:"30px"}}>*/}
            {/*    <InputGroup.Text id="inputGroup-sizing-default">*/}
            {/*        {props.Feed.loginUserNo}*/}
            {/*    </InputGroup.Text>*/}
            {/*    <Form.Control*/}
            {/*        aria-label="Default"*/}
            {/*        aria-describedby="inputGroup-sizing-default"*/}
            {/*        onChange={(e)=> {SetReplyContent(e.target.value);}}*/}
            {/*        value={replyContent}*/}
            {/*    />*/}
            {/*</InputGroup>*/}
            <Box
                sx={{
                    height: 30
                }}
            />
            <TextField fullWidth label="댓글입력" id="fullWidth"
                       onChange={(e)=> {SetReplyContent(e.target.value);}}
                       value={replyContent}
            />
        </div>
            <Button style={{marginTop:"40px", float:"right"}}
                    onClick={() =>{
                        replyInsert();
                        getReplyList();
                        getReplyCount();
                    }}
        >댓글쓰기</Button>
    </div>
        <div style={{clear:"both"}}></div>
    </>

    );
}

export default FeedReplyInsert;