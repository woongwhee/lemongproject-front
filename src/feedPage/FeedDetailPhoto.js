import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import FeedDelete from "./FeedDelete";
import FeedUpdate from "./FeedUpdate";
import FeedPhoto from "./FeedPhoto";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import FeedReply from "./FeedReply";


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

export default function FeedDetailPhoto(props) {
    let{userNo,feedNo,feedContent,feedAt,filePath,photoNo,nickName}=props;

    let filePathList=filePath.split(",");
    let photoNoList=photoNo.split(",");
    const [Feed,setFeed]=useState({userNo,feedNo,feedContent,feedAt,filePathList,photoNoList,nickName})

    return (
        <FeedPhoto filePathList={Feed.filePathList}></FeedPhoto>
    );
}