import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { pink } from '@mui/material/colors';
import axios from "axios";
import {useEffect, useState} from "react";
import {useLoginState} from "../member/LoginContext";
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

function FeedHeart(props) {

    const Feed = props.Feed;

    const label = { inputProps: { 'aria-label' : 'Checkbox demo' } };

    const [heartState, setHeartState] = useState(0) // 좋아요 상태
    const [checked, setChecked] = useState(false); // 좋아요 누르기
    const [heartCount, setHeartCount] = useState(0); // 좋아요 수

    let {profile}=useLoginState();
    let loginUserNo = profile.userNo;

    // ======================================================
    // 좋아요 누르기
    const handleChange = (event) => {
        setChecked(event.target.checked);
        if(checked === false){
            axios.post('api/feed/heartClick',{
                userNo:loginUserNo,
                refNo:Feed.feedNo
            }).then(function (res) {
                setChecked(true);
                reCountHeart();
            })
        }else{
            axios.post('api/feed/heartCancel',{
                userNo:loginUserNo,
                refNo:Feed.feedNo
            }).then(function (res){
                setChecked(false);
                reCountHeart();
            })
        }
    };
    // ======================================================
    // 좋아요 상태
    useEffect(()=>{
        axios.post("api/feed/heartState",{
            userNo:loginUserNo,
            refNo:Feed.feedNo
        }).then(function (res){
            console.log(+res.data);
            setHeartState(res.data);
            if(heartState === 1){
                setChecked(true);
            }else{
                setChecked(false);
            }
        }).catch(function (res){console.log("실패")})
    },[heartState])
    // 중요 문제임.......
    // ======================================================
    // 좋아요 갯수
    useEffect(()=>{
        axios.post("api/feed/heartCount",{
            refNo:Feed.feedNo
        }).then(function (res){
            setHeartCount(res.data)
        }).catch(function (res){console.log("실패")})
    },[])

    const reCountHeart = () =>{
        axios.post("api/feed/heartCount",{
            refNo:Feed.feedNo
        }).then(function (res){
            setHeartCount(res.data)
        }).catch(function (res){console.log("실패")})
    }

    // ======================================================
    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -1,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    return (
        <div>
            <StyledBadge badgeContent={heartCount} color="secondary">
                <Checkbox
                    {...label}
                    checked={checked}
                    onChange={handleChange}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite  sx={{ color: pink[500] }}/>}
                />
            </StyledBadge>
        </div>
    );
}

export default FeedHeart;