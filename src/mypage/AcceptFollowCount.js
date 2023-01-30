import React , {useState , useEffect} from "react";
import axios from "axios";

import './MyPage.css';

function AcceptFollowCount(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    // 팔로우 신청 받은 유저 입장에서 팔로우 신청 수락 시 카운트 올라감.
    const [AcceptCount , setAcceptCount] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/AcceptFollowCount" , {
                params:{
                    follower : follower,
                    followerIng : followerIng,
                }
            }).then(function(res){
                console.log(res+"데이터 통과 성공");
                const data = res.data.result;
                console.log(data);
                setAcceptCount(data);
            }).catch(function(){
                console.log("데이터 통과 실패");
            })
        } , []
    )

    return(
        <div><span>팔로워 : {AcceptCount?.count}</span></div>
    );
};

export default AcceptFollowCount;