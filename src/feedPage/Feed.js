import React, {useState} from 'react';
import './Feed.css'
import FeedReply from './FeedReply';
import FeedUpdate from "./FeedUpdate";
import FeedDelete from "./FeedDelete";
import FeedPhoto from "./FeedPhoto";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";

function Feed(props) {

    let{userNo,feedNo,feedContent,feedAt,filePath,photoNo,nickName}=props;

    let filePathList=filePath.split(",");
    let photoNoList=photoNo.split(",");
    const [Feed,setFeed]=useState({userNo,feedNo,feedContent,feedAt,filePathList,photoNoList,nickName})

    const updateFeed=(key,value)=>{
        setFeed({...Feed,[key]:value})
    }

    const [heart, setHeart] = useState('🤍');
    const [like, setLike] = useState(0);

    return (
        <div className="feed-container">

                <div className="feed-header">
                    <div className="feed-header-left">
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                            R
                        </Avatar>
                        <div style={{border:"1px solid black", margin:"auto"}}>{Feed.nickName}</div>
                    </div>
                    <div className="feed-header-center">
                        {Feed.feedAt}
                    </div>
                    <div className="feed-header-right">
                        <span style={{float:"right"}}><FeedDelete Feed={Feed}/></span>
                        <span style={{float:"right"}}><FeedUpdate Feed={Feed}/></span>

                    </div>
                </div>

                <div className="feed-photo">
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

    );
}

export default Feed;