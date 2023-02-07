import React, {useEffect, useState} from 'react';
import axios from "axios";
import FeedReplyList from "./FeedReplyList";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import FeedReplyResultList from "./FeedReplyResultList";
import Carousel from "react-bootstrap/Carousel";
import FeedLoading from "./FeedLoading";
import Feed from "./Feed1";
import FeedDetailPhoto from "./FeedDetailPhoto";
function FeedDetail(props) {

    const [ testStr, setTestStr ] = useState();

    const feedNo = props.feedNo;

    function callback(str) {
        setTestStr(str);
    }

    useEffect(()=>{axios({
        url:'/api/feed/detailFeed',
        params:{feedNo:feedNo}
    }).then((res)=>{
        console.log(res.data)
        callback(res.data)
        setLoading(false);
    })
    }, [])

    const [id, SetId] = useState();

    const [replyContent, SetReplyContent] = useState();

    const [loading, setLoading] = useState(true);
    let i=0;
    return (
        <>
            <div>
                <div style={{width:"500px", height:"800px"}}>
                    {loading ? <FeedLoading/> : testStr?.map(e=><FeedDetailPhoto key={i++} {...e} />)}
                </div>
            </div>
            <div style={{border:"1px solid black"}}>
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
            </div>
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

export default FeedDetail;