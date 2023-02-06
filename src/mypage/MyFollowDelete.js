import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import './MyPage.css';

function MyFollowDelete(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    function followDelete(){
        axios.get("/api/follow/followDelete" , {
            params:{
                follower : follower ,
                followerIng : followerIng ,
            }
        }).then(function(){
            console.log("데이터 전송 성공");
            alert("팔로우를 취소하였습니다.")
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    return(
        <div>
            <button style={{marginLeft:'350px'}} onClick={followDelete}>팔로우 취소</button>
        </div>
    )
}

export default MyFollowDelete;