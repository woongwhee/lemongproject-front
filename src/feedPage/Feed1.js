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
import TreeItem from "@mui/lab/TreeItem";
import TreeView from '@mui/lab/TreeView';
import FeedReply from "./FeedReply";
import "./Feed.css"
import FeedDetail from "./FeedDetail";
import axios from "axios";
import FeedHeart from "./FeedHeart";
import FeedLoading from "./FeedLoading";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



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
    let{userNo,feedNo,feedContent,feedAt,filePath,photoNo,nickName,loginUserNo}=props;

    let filePathList=filePath.split(",");
    let photoNoList=photoNo.split(",");

    const [Feed,setFeed]=useState({userNo,feedNo,feedContent,feedAt,filePathList,photoNoList,nickName,loginUserNo})

    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [focusDisabledItems, setFocusDisabledItems] = React.useState(false);


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
                <TreeItem nodeId="1" label='설정'>
                    <FeedDelete Feed={Feed}/>
                    <FeedUpdate Feed={Feed}/>
                </TreeItem>
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
                    // <TreeView
                    //     aria-label="disabled items"
                    //     defaultCollapseIcon={<ExpandMoreIcon />}
                    //     defaultExpandIcon={<ChevronRightIcon />}
                    //     disabledItemsFocusable={focusDisabledItems}
                    //     multiSelect
                    // >
                    //     <TreeItem nodeId="1" label="변경하기">
                    //         {Feed.userNo}
                    //         <FeedDelete Feed={Feed}/>
                    //         <FeedUpdate Feed={Feed}/>
                    //     </TreeItem>
                    // </TreeView>
                    updateDeleteButton()
                }
                title={Feed.nickName}
                subheader={Feed.feedAt}
            />
            <CardMedia
                // component="img"
                // height="194"
                // image={Feed.filePathList}
                // alt="Paella dish"
            >
                <FeedPhoto filePathList={Feed.filePathList}></FeedPhoto>

            </CardMedia>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {loginUserNo} <br/> <h3>{Feed.feedContent}</h3>
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {/*{Feed.feedNo}*/}
                {/*<FeedDetail Feed={Feed}></FeedDetail>*/}
                <FeedReply Feed={Feed}></FeedReply>
                <FeedDetail Feed={Feed}></FeedDetail>
                <FeedHeart Feed={Feed}></FeedHeart>
            </CardActions>
            {/*<Collapse in={expanded} timeout="auto" unmountOnExit>*/}
            {/*    <CardContent>*/}
            {/*        <Typography paragraph>Method:</Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set*/}
            {/*            aside for 10 minutes.*/}
            {/*        </Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over*/}
            {/*            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring*/}
            {/*            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a*/}
            {/*            large plate and set aside, leaving chicken and chorizo in the pan. Add*/}
            {/*            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,*/}
            {/*            stirring often until thickened and fragrant, about 10 minutes. Add*/}
            {/*            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.*/}
            {/*        </Typography>*/}
            {/*        <Typography paragraph>*/}
            {/*            Add rice and stir very gently to distribute. Top with artichokes and*/}
            {/*            peppers, and cook without stirring, until most of the liquid is absorbed,*/}
            {/*            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and*/}
            {/*            mussels, tucking them down into the rice, and cook again without*/}
            {/*            stirring, until mussels have opened and rice is just tender, 5 to 7*/}
            {/*            minutes more. (Discard any mussels that don&apos;t open.)*/}
            {/*        </Typography>*/}
            {/*        <Typography>*/}
            {/*            Set aside off of the heat to let rest for 10 minutes, and then serve.*/}
            {/*        </Typography>*/}
            {/*    </CardContent>*/}
            {/*</Collapse>*/}
        </Card>
        </div>
    );
}