import FeedReply from "./FeedReply";
import axios from "axios";
import {useEffect} from "react";
import FeedReplySaveFront from "./feedReplySaveFront";
import Feed from "./Feed";

function FeedReplySave(){
    // const [userNo, setuUserNo] = useState();
    // const [feedNo, setfeedNo] = useState();
    // const [replyNo, setreplyNo] = useState();
    // const [replyAt, setreplyAt] = useState();

    const [ testStr, setTestStr ] = useState();

    function callback(str) {
        setTestStr(str);
    }


    useEffect(
        () => {
            axios({
                url: '/api/feed/main',
                method: 'GET'
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