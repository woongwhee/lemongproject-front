import axios from "axios";
import {useEffect, useState} from "react";
import FeedReplyResultList from "./FeedReplyResultList";
import Table from 'react-bootstrap/Table';

function FeedReplyList(props){
    const [ testStr, setTestStr ] = useState([]);
    const [length,setLength]=useState();
    const feedNo = props.feedNo;

    function callback(str) {
        setTestStr(str);
    }

    // testSTr7개;
    const replylist = ({reply}) => {
        return (
            <div style={{border:"1px solid black"}}>
                {reply.replyNo}
                {reply.userNo}
                {reply.replyContent}
                {reply.replyAt}
            </div>
        );
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
                console.log(res.data.result[0].replyNo) // [7개]
                setTestStr(res.data.result) // [7개]
                setLength(res.data.result.length)
                // console.log(Json.userNo);
                // console.log("Test" + testStr)

            })
        }, [length]
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
            {/*{testStr?.map(e=><FeedReplyResultList key={i++} {...e} feedNo={feedNo}/>)}*/}
            {testStr?.map(reply=>replylist({reply}) )}
            {/*{testStr[0].replyNo}*/}
            {testStr?.length}
            {length}
        </div>
        )

}
export default FeedReplyList;