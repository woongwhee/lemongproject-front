import React, {useEffect, useState} from 'react';
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
function FeedReplyInsert(props) {

    const [id, SetId] = useState();

    const [replyContent, SetReplyContent] = useState();

    let feedNo = props.feedNo;

    const [ testStr, setTestStr ] = useState([]);

    function callback(str) {
        setTestStr(str);
    }
    const deleteReply = async (replyNo, feedNo) => {
        await axios.post('api/feed/deleteReply',
            {
                feedNo:feedNo,
                replyNo:replyNo
            }).then(function (res){
            console.log("삭제 성공")
            // alert("삭제완료")
            window.location.reload("/main");
        })
    }

    // testSTr7개;
    const replylist = ({reply2}) => {
        return (
            <div>
                {/*{reply.replyNo}*/}
                {/*{reply.userNo}*/}
                {/*{reply.replyContent}*/}
                {/*{reply.replyAt}*/}
                {/*{reply.nickName}*/}
                <ListGroup.Item>
                    <div style={{float:"left"}}><Avatar src="/broken-image.jpg" /></div>
                    <div style={{marginLeft:"80px"}}>
                    {reply2.nickName} : {reply2.replyContent}
                        <div style={{float:"right"}}>
                            {/*<Button onClick={()=>{deleteReply(reply2.replyNo,feedNo)}}/>삭제*/}
                        </div>
                    <br/>
                    {reply2.replyAt}

                    </div>

                </ListGroup.Item>

            </div>
        );
    }

    useEffect(
        () => {
            axios({
                url: '/api/feed/listReply',
                method: 'GET',
                params:{
                    feedNo:feedNo
                }
            }).then((res) => {
                // callback(res.data);
                // console.log(res.data.result[0].replyNo) // [7개]
                setTestStr(res.data.result) // [7개]
                // console.log(Json.userNo);
                // console.log("Test" + testStr)

            })
        }, []
    );
    const replyList=()=>{
        axios({
            url: '/api/feed/listReply',
            method: 'GET',
            params:{
                feedNo:feedNo
            }
        }).then((res) => {
            // callback(res.data);
            console.log(res.data.result[0].replyNo) // [7개]
            setTestStr(res.data.result) // [7개]
            // console.log(Json.userNo);
            // console.log("Test" + testStr)

        })
    }

    const replyInsert=()=>{
        axios.post('api/feed/insertReply',{
            userNo:id,
            feedNo:feedNo,
            replyContent:replyContent
        }).then(function (res){
            console.log(res.data)
            SetId('');
            SetReplyContent('');
            // window.location.reload("/main");
        }).catch(function (){
            console.log('실패함 '+id,replyContent);
        })
    }

    let i = 0;
    return (
        <>
        <div>
            {/*<FeedReplyList feedNo={feedNo} />*/}
            <ListGroup variant="flush">
                {testStr?.map(reply=>replylist({reply}))}
            </ListGroup>
        </div>

            <InputGroup className="mb-2" style={{marginTop:"30px"}}>
                <InputGroup.Text id="inputGroup-sizing-default" placeholder="숫자만입력">
                    아이디
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=> {SetId(e.target.value);}}
                    value={id}
                />
            </InputGroup>

            {/*<div style={{marginTop:"30px"}}>피드번호 : {Feed.feedNo}</div>*/}

            <InputGroup className="mb-2" style={{marginTop:"30px"}}>
                <InputGroup.Text id="inputGroup-sizing-default">
                    댓글내용
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=> {SetReplyContent(e.target.value);}}
                    value={replyContent}

                />
            </InputGroup>


            <Button style={{marginTop:"40px", float:"right"}}
                    onClick={() =>{
                        replyInsert();
                        replyList();
                    }}
        >댓글쓰기</Button>
        </>


    );
}

export default FeedReplyInsert;