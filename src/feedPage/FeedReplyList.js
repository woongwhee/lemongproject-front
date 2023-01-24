import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplyResultList from "./FeedReplyResultList";
import Table from 'react-bootstrap/Table';

function FeedReplyList(props){
    const [ testStr, setTestStr ] = useState();

    const feedNo = props.feedNo;

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

                callback(res.data.result);
            })
        }, []
    );

    let i=0;

    return(
        <div>
            <Table striped>
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
            </Table>
        </div>
        )

}
export default FeedReplyList;