import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import MyFollowDelete from "./MyFollowDelete";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import { ImUserPlus } from "react-icons/im";
import {useDispatch, useSelector} from 'react-redux';

function MyFollowApplication(props){

    let{userNo}=props;

    const userNos = useSelector((state) => state.userNo);

    const myNo = userNos == null ? userNo : userNos

    console.log(userNo + " 값 확인중 ")
    console.log(userNos + " 값 확인중 ")

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

   

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = myNo;

    // 팔로우 하는사람(팔로잉)
    const followerIng = userNo;

    // 버튼 클릭시 보낸사람(sessiong.user_No) -> 받는사람(params.userNo)에게 팔로워 신청 보내기.
    function followGo(){
        axios.get("/api/follow/followGo" , {
            params:{
                follower : follower ,
                followerIng : followerIng ,
            }
        }).then(function(res){
            console.log(res+ "데이터 전송 성공");
            alert("팔로우 신청이 완료되었습니다.");
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    function showBtn(){
        if(userNo !== myNo){
            return (
                <>
                <button class="btn btn-primary" style={{marginLeft:'215px' , fontSize:'13px', marginTop:'-325px' , borderRadius:'100px' , width:'100px'}} onClick={followGo}>팔로우 신청</button>
                <MyFollowDelete/>
                </>
            )
        }
    }

    return(
        <div>
            {showBtn()}
        </div>
    )
}

export default MyFollowApplication;