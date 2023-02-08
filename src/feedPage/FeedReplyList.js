import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplyResultList from "./FeedReplyResultList";
import Table from 'react-bootstrap/Table';

function FeedReplyList({feedNo}){
    const [ testStr, setTestStr ] = useState([]);

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
                // callback(res.data);
                console.log(res.data.result)
                setTestStr(res.data.result)
                // console.log(Json.userNo);
                console.log("Test" + testStr)
            })
        }, []
    );
    let i=0;
    return(
        <div>
            <Table striped>
                <thead>
                    <tr>
                    <th>댓글번호</th>
                    <th>아이디</th>
                    <th>댓글내용</th>
                    <th>댓글시간</th>
                    <th>댓글삭제</th>
                    </tr>
                </thead>
            </Table>
                    {testStr?.map(e=><FeedReplyResultList key={i++} {...e} feedNo={feedNo}/>)}
        </div>
        )

}
export default FeedReplyList;