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

    // const feedNo = props.feedNo
    // const loginUserNo = props.loginUserNo;
    const feedNo = props.Feed.feedNo;

    const [id, SetId] = useState(); // ID

    const [replyContent, SetReplyContent] = useState(); // CONTENT

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
            // alert("삭제완료")
            getReplyList();
        })
    }

    // testSTr7개;
    // const replyList = ({reply}) => {
    //     return (
    //         <div>
    //             <ListGroup.Item>
    //                 <div style={{float:"left"}}><Avatar src="/broken-image.jpg" /></div>
    //                 <div style={{marginLeft:"80px"}}>
    //                 {reply.nickName} : {reply.replyContent}
    //                     <div style={{float:"right"}}>
    //                         {/*<Button onClick={()=>{deleteReply(reply2.replyNo,feedNo)}}/>삭제*/}
    //                     </div>
    //                 <br/>
    //                 {reply.replyAt}
    //                 </div>
    //             </ListGroup.Item>
    //         </div>
    //     );
    // }

    const replyList2 = () =>{
        const result = [];
        for(let i =0; i<testStr.length; i++){
            result.push((
                <div key={i}>
                    <ListGroup.Item>
                        <div style={{float:"left"}}>
                            <Avatar src="/broken-image.jpg" />
                        </div>
                        <div style={{marginLeft:"80px"}}>
                            {testStr[i].nickName} : {testStr[i].replyContent}
                            <div style={{float:"right"}}>
                                <CloseButton onClick={()=>{deleteReply(testStr[i].replyNo,feedNo)}}/>삭제
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
                // console.log(res.data.result) // [7개]
                setTestStr(res.data.result) // [7개]
            })
        }, []
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
                console.log(res.data) // [7개]
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
            <InputGroup className="mb-2" style={{marginTop:"30px"}}>
                <InputGroup.Text id="inputGroup-sizing-default">
                    {props.Feed.nickName}
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=> {SetReplyContent(e.target.value);}}
                    value={replyContent}
                />
            </InputGroup>
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