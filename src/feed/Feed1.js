import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useEffect, useReducer, useState} from "react";
import FeedDelete from "./FeedDelete";
import FeedUpdate from "./FeedUpdate";
import FeedPhoto from "./FeedPhoto";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import FeedReply from "./FeedReply";
import "./Feed.css"
import FeedDetail from "./FeedDetail";
import axios from "axios";
import FeedHeart from "./FeedHeart";
import FeedLoading from "./FeedLoading";
import {useLoginState} from "../member/LoginContext";
import SettingsIcon from "@mui/icons-material/Settings";
import Box from "@mui/joy/Box";
import PropTypes from "prop-types";
import moment from "moment";



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


export default function RecipeReviewCard(props) {
    let{userNo,feedNo,feedContent,feedAt,filePath,photoNo,nickName}=props;

    let loginUserNo=useLoginState().profile.userNo;

    let filePathList=filePath.split(",");
    let photoNoList=photoNo.split(",");
    const [Feed,setFeed]=useState({userNo,feedNo,feedContent,feedAt,filePathList,photoNoList,nickName,loginUserNo})

    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [focusDisabledItems, setFocusDisabledItems] = React.useState(false);


    const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
        color: theme.palette.text.secondary,
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            borderTopRightRadius: theme.spacing(2),
            borderBottomRightRadius: theme.spacing(2),
            paddingRight: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium,
            '&.Mui-expanded': {
                fontWeight: theme.typography.fontWeightRegular,
            },
            '&:hover': {
                backgroundColor: theme.palette.action.hover,
            },
            '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
                backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
                color: 'var(--tree-view-color)',
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: 'inherit',
                color: 'inherit',
            },
        },
        [`& .${treeItemClasses.group}`]: {
            marginLeft: 0,
            [`& .${treeItemClasses.content}`]: {
                paddingLeft: theme.spacing(2),
            },
        },
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
                    <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                        <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                            {labelText}
                        </Typography>
                        <Typography variant="caption" color="inherit">
                            {labelInfo}
                        </Typography>
                    </Box>
                }
                style={{
                    '--tree-view-color': color,
                    '--tree-view-bg-color': bgColor,
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
        labelText: PropTypes.string.isRequired,
    };


    const updateDeleteButton = () => {
        if(userNo===loginUserNo){
            return(
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
            </TreeView>)
        }
    }
    const [profilePath, setProfilePath] = useState();

    const Profile = (userNo) => {

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
        <div className="feed-container">
        <Card sx={{ maxWidth: 500 ,minWidth : 500 ,border:"1px solid gray"}}>
            <CardHeader
                avatar={
                    Profile(userNo)
                }
                action={
                    updateDeleteButton()
                }
                title={Feed.nickName}
                subheader={new moment(Feed.feedAt).format('YY.MM.DD')}
            />
            <CardMedia>
                <FeedPhoto filePathList={Feed.filePathList}></FeedPhoto>
            </CardMedia>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {loginUserNo} <br/> <h3>{Feed.feedContent}</h3>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <FeedReply Feed={Feed}></FeedReply>
                <FeedDetail Feed={Feed}></FeedDetail>
                <FeedHeart Feed={Feed}></FeedHeart>
            </CardActions>
        </Card>
        </div>
    );
}