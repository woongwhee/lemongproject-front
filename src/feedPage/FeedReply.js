import React, {useState} from 'react';
import axios from "axios";


function FeedReply(props) {
    const [id, SetId] = useState();
    const [feedNo, SetFeedNo] = useState();
    const [replyContent, SetReplyContent] = useState();

    return (
        <>
        <div>
            1. 댓글<br/>
            2. 댓글<br/>
            3. 댓글<br/>
            4. 댓글<br/>
            <hr/>
        </div>
        아이디 : <input type="text" onChange={(e)=> {SetId(e.target.value);}}/>
            <br/>
        피드번호 : <input type="text" onChange={(e)=> {SetFeedNo(e.target.value);}}/>
            <br/>
        댓글내용 : <input type="text" onChange={(e)=> {SetReplyContent(e.target.value);}}/>
            <br/>

            <button onClick={
                () => axios.post('api/feed/reply',{
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

        </>


    );
}

export default FeedReply;