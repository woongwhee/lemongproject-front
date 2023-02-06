import React from 'react';
import axios from "axios";

function FeedReplyResultList(props) {

    let{userNo, feedNo ,replyNo, replyContent, replyAt} = props;

    return (

        <tr>
            <td>{replyNo}</td>
            <td>{userNo}</td>
            <td>{replyContent}</td>
            <td>{replyAt}</td>
            <td style={{cursor:"pointer"}} onClick={ () => axios.post('api/feed/deleteReply',
                {
                    feedNo:feedNo,
                    replyNo:replyNo
                }).then(function (res){
                    console.log("삭제 성공")
                    alert("삭제완료")
                    window.location.reload("/main");
            })
            }>X</td>
        </tr>

    );
}

export default FeedReplyResultList;