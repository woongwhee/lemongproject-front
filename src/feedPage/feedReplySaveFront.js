import React from 'react';

function FeedReplySaveFront(props) {

    let{userNo, feedNo, replyNo, replyAt} = props;

    return (
        <>
            <tr>{userNo}</tr>
            <tr>{feedNo}</tr>
            <tr>{replyNo}</tr>
            <tr>{replyAt}</tr>
        </>
    );
}

export default FeedReplySaveFront;