import React from 'react';

function FeedReplyResultList(props) {

    let{userNo, feedNo, replyNo, replyAt} = props;

    return (
        <tr>
            <td>{userNo}</td>
            <td>{feedNo}</td>
            <td>{replyNo}</td>
            <td>{replyAt}</td>
        </tr>
    );
}

export default FeedReplyResultList;