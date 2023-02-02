import React, {useState} from 'react';
import './Feed.css'
import FeedReply from './FeedReply';
import FeedUpdate from "./FeedUpdate";
import FeedDelete from "./FeedDelete";
import FeedPhoto from "./FeedPhoto";
import FeedLoading from "./FeedLoading";




function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt,filePath,photoNo}=props;

    let filePathList=filePath.split(",");
    let photoNoList=photoNo.split(",");
    const [Feed,setFeed]=useState({userNo,feedNo,feedContent,feedAt,filePathList,photoNoList})

    const updateFeed=(key,value)=>{
        setFeed({...Feed,[key]:value})
    }

    const [heart, setHeart] = useState('🤍');
    const [like, setLike] = useState(0);



    return (
        <div className="feed-container">
            <div className="feed">
                <div className="feed-header">
                    <div className="feed-header-left">
                        피드시간 : {Feed.feedAt} <br/>
                    </div>
                    <div className="feed-header-right">
                        <FeedUpdate Feed={Feed}/>
                        <FeedDelete Feed={Feed}/>
                    </div>
                </div>

                <div className="feed-photo">
                    <span>피드번호 : {Feed.feedNo}</span>
                    <span>이름 : {Feed.userNo}</span>

                    <FeedPhoto filePathList={Feed.filePathList}></FeedPhoto>
                </div>
                <div className="feed-body">
                    <div className="feed-header-left">
                        <button onClick={ () => {setLike(like + 1); }}>🤍</button>
                        <button onClick={ () => {setHeart('❤')}}>{heart}</button>
                        <FeedReply feedNo={Feed.feedNo}></FeedReply>
                    </div>
                    <div className="feed-header-right">
                        좋아요 : {like}
                    </div>
                </div>

                <div className="feed-content">
                    <span>{Feed.userNo}(닉네임) : {Feed.feedContent}</span>
                </div>
            </div>
        </div>

    );
}

export default Feed;