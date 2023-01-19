import FeedReply from "./FeedReply";
import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplySaveFront from "./feedReplySaveFront";
import Feed from "./Feed";

function FeedReplySave(){
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
    return(
        <div>
            <table>
                <th>피드번호</th>
                <th>아이디</th>
                <th>댓글내용</th>
                <th>댓글시간</th>
                <tr>
                    {testStr?.map(e=><FeedReplySaveFront key={i++} {...e}/>)}
                </tr>
            </table>

        </div>
        )

}
export default FeedReplySave;