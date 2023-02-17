import React from 'react';
import axios from "axios";

function FeedReplyResultList(props) {

    let{userNo, feedNo ,replyNo, replyContent, replyAt} = props;

    const deleteReply = () => {
        axios.post('api/feed/deleteReply',
            {
                feedNo:feedNo,
                replyNo:replyNo
            }).then(function (res){
            console.log("삭제 성공")
            alert("삭제완료")
            window.location.reload("/main");
        })
    }
    return (<div>
            {replyNo}
            {userNo}
            {replyContent}
            {replyAt}
        </div>
    );
}
export default FeedReplyResultList;