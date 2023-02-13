import React, {useEffect, useState} from 'react';
import FeedDetailPhoto from "./FeedDetailPhoto";
import "./FeedDetail.css"
import FeedReplyInsert from "./FeedReplyInsert";
import Avatar from "@mui/material/Avatar";

function FeedDetailView(props) {
    const Feed = props.Feed;

    let i=0;
    return (
        <>
            <div className="container">
                <div className="photoArea">
                    <FeedDetailPhoto filePathList={Feed.filePathList}></FeedDetailPhoto>
                    <div style={{marginTop:"20%"}}>
                        <div style={{float:"left"}}><Avatar src="/broken-image.jpg" /></div>
                        <div style={{marginLeft:"20%"}}><h3>{Feed.nickName}</h3></div>
                    </div>
                </div>
                <div className="detailRight">
                    <div className="contentArea" style={{border:"1px solid blue"}}>
                        <div style={{marginLeft:"5%", marginTop:"5%"}}><h3>{Feed.feedContent}</h3></div>
                        좋아요 댓글수
                    </div>
                    <div className="replyArea" style={{overflow:"scroll"}}>
                        <FeedReplyInsert feedNo={Feed.feedNo}></FeedReplyInsert>
                    </div>


                </div>
            </div>
        </>


    );
}

export default FeedDetailView;