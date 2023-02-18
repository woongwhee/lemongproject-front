import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import './MyPage.css';

import { ImUserMinus } from "react-icons/im";
import {useDispatch, useSelector} from 'react-redux';

function MyFollowDelete(props){

    // const queryString = window.location.search;
    // const params = new URLSearchParams(queryString);

    let{userNo}=props;

    const userNos = useSelector((state) => state.userNo.selectUserNo);

    const myNo = userNos == null ? userNo : userNos

    console.log(userNo + " 값 확인중 ")
    console.log(userNos + " 값 확인중 ")

    // 팔로우 당하는사람(팔로워)

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    function followDelete(){
        axios.get("/api/follow/followDelete" , {
            params:{
                follower : userNo ,
                followerIng : myNo ,
            }
        }).then(function(){
            console.log("데이터 전송 성공");
            alert("팔로우를 취소하였습니다.");
            window.location.href = "http://localhost:3000"
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
    }

    return(
        <div>
            <button class="btn btn-primary" style={{marginLeft:'325px' , fontSize:'13px' , marginTop:'-373px' , borderRadius:'100px' , width:'100px' , height:'34px'}} onClick={followDelete}>팔로우 취소</button>
        </div>
    )
}

export default MyFollowDelete;