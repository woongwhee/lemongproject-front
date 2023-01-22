import React, {useState} from 'react';
import axios from "axios";
import FeedReplyList from "./FeedReplyList";

function FeedReplyInsert(props) {
    const [id, SetId] = useState();

    const [replyContent, SetReplyContent] = useState();

    let feedNo = props.feedNo;


    const 스타일 ={
        border: '1px solid green'
    }

    return (
        <>
        <div>
            <FeedReplyList feedNo={feedNo}/>
        </div>
    <div style={스타일}>

        아이디 : <input type="text" onChange={(e)=> {SetId(e.target.value);}} placeholder="숫자만입력"/>
            <br/>
        피드번호 : {feedNo}
            <br/>
        댓글내용 : <input type="text" onChange={(e)=> {SetReplyContent(e.target.value);}}/>
            <br/>

            <button onClick={
                () => axios.post('api/feed/insertReply',{
                    userNo:id,
                    feedNo:feedNo,
                    replyContent:replyContent
                }).then(function (res){
                    console.log(res.data)
                }).catch(function (){
                    console.log('실패함'+id,feedNo,replyContent);
                })
            }
        >댓글쓰기</button>
    </div>
        </>


    );
}

export default FeedReplyInsert;