import React, {useState} from 'react';

function FeedReply(props) {
    let[userName] = useState('minseok')                 /* 댓글이름*/
    let[comment, setComment]=useState('');               /* 댓글내용*/
    let [feedComments, setFeedComments] = useState([]); /* 지금까지 달린 댓글 내용*/
    let [isValid, setIsValid] = useState(false);        /* 댓글 게시 가능 여부*/

    let post = e => {
        const copyFeedComments = [...feedComments];
        copyFeedComments.push(comment);
        setFeedComments(copyFeedComments);
        setComment('');                         // 댓글창지우기
    };


    return (
        <>
            <input type="text" placeholder="댓글 내용"
                   onChange={e => {
                       setComment(e.target.value)}
                   }
                   onKeyUp={e => {
                       e.target.value.length > 0 ? setIsValid(true) : setIsValid(false);}
                   } value={comment}/>
            <button type="button" onClick={post} disabled={isValid ? false : true}>댓글쓰기</button>

        </>
    );

    function CommentList(props){
        return(
            <div className="userCommnetBox">
                <p>댓글창</p>
                <p className="userName">{props.userName}</p>
                <div className="userComment">{props.userComment}</div>
            </div>
        )
    }
    {feedComments.map((commentArr, i) => {
        return(
            <CommentList userName={userName}
                         userComment={commentArr}
                         key={i}/>
        )
    })}

}

export default FeedReply;