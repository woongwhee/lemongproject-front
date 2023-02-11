import React, {useEffect, useState} from 'react';
import FeedDetailPhoto from "./FeedDetailPhoto";
import "./FeedDetail.css"
import FeedReplyInsert from "./FeedReplyInsert";
import Avatar from "@mui/material/Avatar";


function FeedDetailView(props) {

    const Feed = props.Feed;

    const [replyCount, setReplyCount] = useState()

    let i=0;
    return (
        <>
            <div className="container"
                 style={{
                    // display: "flex",
                    border: "5px solid blue",
                     // width:"100%",
                    // height: "100%"
            }}>

                <div className="photoArea" style={{border:"3px solid orange",float:"left"}}>
                    <FeedDetailPhoto filePathList={Feed.filePathList}></FeedDetailPhoto>
                    <div style={{marginTop:"20%", marginBottom:"20%"}}>
                        <div style={{float:"left", marginLeft:"5%"}}><Avatar src="/broken-image.jpg" /></div>
                        <div style={{marginLeft:"20%"}}><h3>{Feed.nickName}</h3></div>
                    </div>
                </div>
                <div style={{border:"5px solid pink",float:"left"}}>
                    <div className="contentArea"
                         style={{
                             border:"3px solid gray"
                    }}>
                        <div style={
                            {marginLeft:"2%",
                                marginTop:"2%",
                                border:"4px solid red",
                                width:"500px"
                                }}>
                            <h3>{Feed.feedContent}</h3>
                        </div>

                    </div>
                </div>
                <div style={{float:"left"}}>
                    <div style={{
                        border:"5px solid black",
                    }}>
                        좋아요 :
                        <br/>
                        댓글수 : {replyCount}
                    </div>
                    <div className="replyArea"
                         style={{
                             // overflow:"scroll",
                             border:"5px solid purple",
                             width:"500px", height:"500px",
                         }}>
                        <FeedReplyInsert Feed={Feed} setReplyCount={setReplyCount}></FeedReplyInsert>
                    </div>
                </div>
            </div>
        </>


    );
}

export default FeedDetailView;