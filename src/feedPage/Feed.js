import React, {useState} from 'react';
import './Feed.css'
import FeedReply from './FeedReply';
import FeedUpdate from "./FeedUpdate";
import FeedDelete from "./FeedDelete";
import FeedPhoto from "./FeedPhoto";




function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt}=props;

    const [heart, setHeart] = useState('🤍');

    const [like, setLike] = useState(0);

    return (
        <div className="feed-container">
            <div className="feed">
                <div className="feed-header">
                    <div className="feed-header-left">
                        피드시간 : {feedAt}
                    </div>
                    <div className="feed-header-right">
                        <FeedUpdate feedNo={feedNo}feedContent={feedContent}/>
                        <FeedDelete feedNo={feedNo}/>
                    </div>
                </div>

                <div className="feed-photo">
                    <p>피드번호 : {feedNo}</p>
                    <span>이름 : {userNo}</span>

                    <FeedPhoto></FeedPhoto>
                </div>
                <div className="feed-body">
                    <div className="feed-header-left">
                        <button onClick={ () => {setLike(like + 1); }}>🤍</button>
                        <button onClick={ () => {setHeart('❤')}}>{heart}</button>
                        <FeedReply feedNo={feedNo}></FeedReply>
                    </div>
                    <div className="feed-header-right">
                        좋아요 : {like}
                    </div>
                </div>

                <div className="feed-content">
                    <p>{userNo}(닉네임) : {feedContent}</p>
                </div>
            </div>
        </div>

    );
}

export default Feed;