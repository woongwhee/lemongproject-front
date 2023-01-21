import FeedReplyInsert from "./FeedReplyInsert";
import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplyResultList from "./FeedReplyResultList";
import Feed from "./Feed";

function FeedReplyList(){
    const [ testStr, setTestStr ] = useState();
    const [feedNo, setFeedNo] = useState();

    function callback(str) {
        setTestStr(str);
        setFeedNo(str);
    }

    useEffect(
        () => {
            axios.get({ url: '/api/feed/replySelect',
                data:feedNo
            }).then((res) => {
                callback(res.data.result);
            })
        }, []
    );

    let i=0;
    const {스타일} = {
        border: '1px solid green'
    }
    return(
        <div style={스타일}>
            <table>
                <th>피드번호</th>
                <th>아이디</th>
                <th>댓글내용</th>
                <th>댓글시간</th>
                {testStr?.map(e=><FeedReplyResultList key={i++} {...e}/>)}

            </table>
        </div>
        )

}
export default FeedReplyList;