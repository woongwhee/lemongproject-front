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
import {useLoginState} from "../member/LoginContext";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FeedDelete from "./FeedDelete";
import FeedUpdate from "./FeedUpdate";
import Badge from "@mui/material/Badge";


import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import SettingsIcon from '@mui/icons-material/Settings';

function FeedDetailView(props) {

    const Feed = props.Feed;

    const [replyCount, setReplyCount] = useState()

    const {profile} = useLoginState();
    const loginUserNo = profile.userNo;


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

    const [focusDisabledItems, setFocusDisabledItems] = React.useState(false);

    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            "&.Mui-expanded": {
                fontWeight: theme.typography.fontWeightRegular
            },
            "&:hover": {
                backgroundColor: theme.palette.action.hover
            },
            "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: "var(--tree-view-color)"
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: "inherit",
                color: "inherit"
            }
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2)
            }
        }
    }));

    function StyledTreeItem(props) {
        const {
            bgColor,
            color,
            labelIcon: LabelIcon,
            labelInfo,
            labelText,
            ...other
        } = props;

        return (
            <StyledTreeItemRoot
                label={
                    <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: "inherit", flexGrow: 1 }}
                        >
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                }
                style={{
                    "--tree-view-color": color,
                    "--tree-view-bg-color": bgColor
                }}
                {...other}
            />
        );
    }

    StyledTreeItem.propTypes = {
        bgColor: PropTypes.string,
        color: PropTypes.string,
        labelIcon: PropTypes.elementType.isRequired,
        labelInfo: PropTypes.string,
        labelText: PropTypes.string.isRequired
    };

    const updateDeleteButton = () => {
        if(Feed.userNo===loginUserNo){
            return(
                <div style={{width:"100px", margin:"auto"}}>
                <TreeView
                    aria-label="disabled items"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    disabledItemsFocusable={focusDisabledItems}
                    multiSelect
                >
                    <StyledTreeItem nodeId="1" labelText="" labelIcon={SettingsIcon}>
                        <FeedDelete Feed={Feed}/>
                        <FeedUpdate Feed={Feed}/>
                    </StyledTreeItem>
                </TreeView>
                </div>)

        }
    }

    return (
        <>
            <div style={{width:"100%" }}>
                <div style={{float:"left",width:"70%",height:"100%"}}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8 }}>
                            <Grid xs={4}>
                                <Item>
                                    <div style={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        minWidth: "100%",
                                        minHeight: "100%"}}>
                                        <FeedDetailPhoto filePathList={Feed.filePathList}></FeedDetailPhoto></div>
                                </Item>
                            </Grid>
                            <Grid xs={4}>
                                <Item>
                                <div style={{float:"left", marginLeft:"5%"}}>
                                    {proFile(Feed.userNo)}
                                </div>
                                <div style={{marginLeft:"20%"}}><h3>{Feed.nickName}</h3></div>
                                <hr/>
                                <div className="FeedDetailView-content"><h5>{Feed.feedContent}</h5></div>

                                <div style={{padding:"auto", height:"50px", marginBottom:"50px"}}>
                                    <div style={{ width:"35%",float:"left"}}>
                                        <FeedHeart Feed={Feed}></FeedHeart>
                                    </div>
                                    <div style={{width:"33%",height:"40px",paddingTop:"9px" ,float:"left"}}>
                                        <Badge badgeContent={replyCount} color="primary">
                                            <ChatBubbleIcon/>
                                        </Badge>
                                    </div>
                                    <div style={{width:"32%", paddingTop:"5px", float:"left"}}>{updateDeleteButton()}</div>
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