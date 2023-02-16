import React, {useEffect, useState} from 'react';
import FeedDetailPhoto from "./FeedDetailPhoto";
import "./FeedDetail.css"
import FeedReplyInsert from "./FeedReplyInsert";
import Avatar from "@mui/material/Avatar";

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import FeedHeart from "./FeedHeart";
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import axios from "axios";

function FeedDetailView(props) {

    const Feed = props.Feed;

    const [replyCount, setReplyCount] = useState()


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));
    const [profilePath, setProfilePath] = useState();

    const proFile = (userNo) => {
        axios.post('api/feed/feedProfile',{
            userNo:userNo
        }).then(function (res){
            // console.log(res.data.FILEPATH);
            setProfilePath(res.data.FILEPATH)
        })
        return(
            <Avatar alt="Remy Sharp" src={profilePath} />
        )
    }

    return (
        <>
            {/*<div className="container"*/}
            {/*     style={{*/}
            {/*        // display: "flex",*/}
            {/*        border: "5px solid blue",*/}
            {/*         // width:"100%",*/}
            {/*        // height: "100%"*/}
            {/*}}>*/}

            {/*    <div className="photoArea" style={{border:"3px solid orange",float:"left"}}>*/}
            {/*        <FeedDetailPhoto filePathList={Feed.filePathList}></FeedDetailPhoto>*/}
            {/*        <div style={{marginTop:"20%", marginBottom:"20%"}}>*/}
            {/*            <div style={{float:"left", marginLeft:"5%"}}><Avatar src="/broken-image.jpg" /></div>*/}
            {/*            <div style={{marginLeft:"20%"}}><h3>{Feed.nickName}</h3></div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={{border:"5px solid pink",float:"left"}}>*/}
            {/*        <div className="contentArea"*/}
            {/*             style={{*/}
            {/*                 border:"3px solid gray"*/}
            {/*        }}>*/}
            {/*            <div style={*/}
            {/*                {marginLeft:"2%",*/}
            {/*                    marginTop:"2%",*/}
            {/*                    border:"4px solid red",*/}
            {/*                    width:"500px"*/}
            {/*                    }}>*/}
            {/*                <h3>{Feed.feedContent}</h3>*/}
            {/*            </div>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div style={{float:"left"}}>*/}
            {/*        <div style={{*/}
            {/*            border:"5px solid black",*/}
            {/*        }}>*/}
            {/*            좋아요 :*/}
            {/*            <br/>*/}
            {/*            댓글수 : {replyCount}*/}
            {/*        </div>*/}
            {/*        <div className="replyArea"*/}
            {/*             style={{*/}
            {/*                 // overflow:"scroll",*/}
            {/*                 border:"5px solid purple",*/}
            {/*                 width:"500px", height:"500px",*/}
            {/*             }}>*/}
            {/*            <FeedReplyInsert Feed={Feed} setReplyCount={setReplyCount}></FeedReplyInsert>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div style={{width:"100%" }}>
                <div style={{float:"left",width:"70%",height:"100%"}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8 }}>
                            <Grid xs={4} >
                                <Item>
                                    <div style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        minWidth: "100%",
                                        minHeight: "100%"}}><FeedDetailPhoto filePathList={Feed.filePathList}></FeedDetailPhoto></div>
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                <div style={{float:"left", marginLeft:"5%"}}>
                                    {proFile(Feed.userNo)}
                                </div>
                                <div style={{marginLeft:"20%"}}><h3>{Feed.nickName}</h3></div>
                                <hr/>
                                <div style={{textAlign:"left", height:"300px", overflow:"scroll"}}><h5>{Feed.feedContent}</h5></div>
                                <div>
                                    <FeedHeart Feed={Feed}></FeedHeart>
                                    <br/>
                                    <ChatBubbleIcon/> : {replyCount}
                                </div>
                                </Item>
                            </Grid>
                    </Grid>
                </Box>
                </div>
                <div style={{float:"left", width:"30%"}}>
                <FeedReplyInsert Feed={Feed} setReplyCount={setReplyCount}></FeedReplyInsert>
                </div>
            </div>
        </>


    );
}

export default FeedDetailView;