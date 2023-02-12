import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { pink } from '@mui/material/colors';
import axios from "axios";
import {useEffect, useState} from "react";

function FeedHeart(props) {

    const Feed = props.Feed;

    const label = { inputProps: { 'aria-label' : 'Checkbox demo' } };

    const [heartState, setHeartState] = useState(0) // 좋아요 상태
    const [checked, setChecked] = useState(false); // 좋아요 누르기
    const [heartCount, setHeartCount] = useState(0); // 좋아요 수

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if(checked === false){
            axios.post('api/feed/heartClick',{
                userNo:Feed.loginUserNo,
                refNo:Feed.feedNo
            }).then(function (res) {
                console.log("좋아요 추가" +res.data)
                setChecked(true);
                // reHeart();
                reCountHeart();
            })
        }
        else{
            axios.post('api/feed/heartCancel',{
                userNo:Feed.loginUserNo,
                refNo:Feed.feedNo
            }).then(function (res){
                console.log("좋아요 취소" +  res.data)
                setChecked(false);
                // reHeart();
                reCountHeart();
            })
        }
    };


    useEffect(()=>{
        axios.post("api/feed/heartState",{
            userNo:Feed.loginUserNo,
            refNo:Feed.feedNo
        }).then(function (res){
            // console.log(res.data);
            setHeartState(res.data);
            if(heartState === 1){
                setChecked(true);
            }else{
                setChecked(false);
            }
        }).catch(function (res){console.log("실패")})
    })
    // const reHeart = () => {
    //     axios.post("api/feed/heartState",{
    //         userNo:Feed.loginUserNo,
    //         refNo:Feed.feedNo
    //     }).then(function (res){
    //         // console.log(res.data);
    //         setHeartState(res.data);
    //         if(heartState === 1){
    //             setChecked(true);
    //         }else{
    //             setChecked(false);
    //         }
    //     }).catch(function (res){console.log("실패")})
    // }

    useEffect(()=>{
        axios.post("api/feed/heartCount",{
            refNo:Feed.feedNo
        }).then(function (res){
            setHeartCount(res.data)
        }).catch(function (res){console.log("실패")})
    })
    const reCountHeart = () =>{
        axios.post("api/feed/heartCount",{
            refNo:Feed.feedNo
        }).then(function (res){
            setHeartCount(res.data)
        }).catch(function (res){console.log("실패")})
    }

    return (
        <div>
            <Checkbox
                {...label}
                checked={checked}
                onChange={handleChange}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite  sx={{ color: pink[500] }}/>} />
            {heartCount}


            {/*<Checkbox*/}
            {/*    {...label}*/}
            {/*    icon={<BookmarkBorderIcon />}*/}
            {/*    checkedIcon={<BookmarkIcon />}*/}
            {/*/>*/}

            {/*<div>*/}
            {/*    <button onClick={()=>{*/}
            {/*        axios.post("api/feed/heartState",{*/}
            {/*            userNo:Feed.loginUserNo,*/}
            {/*            refNo:Feed.feedNo*/}
            {/*        }).then(function (res){*/}
            {/*            console.log(res.data);*/}
            {/*            setHeartState(res.data);*/}
            {/*        }).catch(function (res){console.log("실패")})*/}
            {/*    }}>gd</button>*/}
            {/*</div>*/}
        </div>
    );
}

export default FeedHeart;