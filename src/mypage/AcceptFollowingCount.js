import React , {useState , useEffect} from "react";
import axios from "axios";

function AcceptFollowingCount(){

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    const follower = params.get("userNo");

    // 팔로우 하는사람(팔로잉)
    const followerIng = sessionStorage.getItem("userNo");

    // 팔로우 신청을 받은 사용자 입장에서 
    // 나의 팔로우 수락여부에 상관없이 팔로잉이 플러스되어야함.
    const [AcceptFollowingCount , setAcceptFollowingCount] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/AcceptFollowingCount" , {
                params : {
                    follower : follower , 
                }
            }).then(function(res){
                console.log(res+"데이터 전송 성공");
                const data = res.data.result;
                setAcceptFollowingCount(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        } , []
    )

    return(
        <div>팔로잉 : <p>{AcceptFollowingCount?.count}</p></div>
    );
};

export default AcceptFollowingCount;