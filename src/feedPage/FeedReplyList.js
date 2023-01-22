
import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplyResultList from "./FeedReplyResultList";


function FeedReplyList(props){
    const [ testStr, setTestStr ] = useState();

    const feedNo = props.feedNo;

    console.log(feedNo);

    function callback(str) {
        setTestStr(str);

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
                console.log(res.data.result)
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
            <table >
                <thead>
                    <tr>
                    <th>피드번호 : {feedNo}</th>
                    <th>아이디</th>
                    <th>댓글내용</th>
                    <th>댓글시간</th>
                    </tr>
                </thead>
                <tbody>
                    {testStr?.map(e=><FeedReplyResultList key={i++} {...e}/>)}
                </tbody>
            </table>
        </div>
        )

}
export default FeedReplyList;