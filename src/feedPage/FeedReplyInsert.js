import React, {useState} from 'react';
import axios from "axios";
import FeedReplyList from "./FeedReplyList";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function FeedReplyInsert(props) {
    const [id, SetId] = useState();

    const [replyContent, SetReplyContent] = useState();

    let feedNo = props.feedNo;


    return (
        <>
        <div>
            <FeedReplyList feedNo={feedNo}/>
        </div>

            <InputGroup className="mb-2" style={{marginTop:"30px"}}>
                <InputGroup.Text id="inputGroup-sizing-default" placeholder="숫자만입력">
                    아이디
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=> {SetId(e.target.value);}}
                />
            </InputGroup>

            <div style={{marginTop:"30px"}}>피드번호 : {feedNo}</div>

            <InputGroup className="mb-2" style={{marginTop:"30px"}}>
                <InputGroup.Text id="inputGroup-sizing-default">
                    댓글내용
                </InputGroup.Text>
                <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    onChange={(e)=> {SetReplyContent(e.target.value);}}
                />
            </InputGroup>


        {/*아이디 : <input type="text" onChange={(e)=> {SetId(e.target.value);}} placeholder="숫자만입력"/>*/}
        {/*    <br/>*/}
        {/*피드번호 : {feedNo}*/}
        {/*    <br/>*/}
        {/*댓글내용 : <input type="text" onChange={(e)=> {SetReplyContent(e.target.value);}}/>*/}
        {/*    <br/>*/}

            <Button style={{marginTop:"40px", float:"right"}} onClick={
                () => axios.post('api/feed/insertReply',{
                    userNo:id,
                    feedNo:feedNo,
                    replyContent:replyContent
                }).then(function (res){
                    console.log(res.data)
                    SetId('');
                    SetReplyContent('');
                    window.location.reload("/main");
                }).catch(function (){
                    console.log('실패함 '+id,feedNo,replyContent);
                })
            }
        >댓글쓰기</Button>
        </>


    );
}

export default FeedReplyInsert;