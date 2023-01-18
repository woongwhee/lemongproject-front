import React from 'react';
import './Feed.css'

function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt}=props;

    return (
        <div className="te">
            <div className="a">
                <p>이름 : {userNo}</p>
                <p>피드시간 : {feedAt}</p>
            </div>
            <div className="b">
                <p>피드번호 : {feedNo}</p>
            </div>
            <div className="c">
                <p>피드내용 : {feedContent}</p>
            </div>
            <div className="d">
                <p>댓글</p>
            </div>
        </div>
    );
}

export default Feed;