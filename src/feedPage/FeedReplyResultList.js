import React from 'react';

function FeedReplyResultList(props) {

    let{userNo, feedNo, replyContent, replyAt} = props;

    return (

        <tr>
            <td>{feedNo}</td>
            <td>{userNo}</td>
            <td>{replyContent}</td>
            <td>{replyAt}</td>
        </tr>

    );
}

export default FeedReplyResultList;