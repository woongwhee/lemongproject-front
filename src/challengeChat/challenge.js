import React , {useState , useEffect} from "react";
import axios from "axios";


function Challenge(props){

    let{userNo}=props;

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    // const userNo = params.get("userNo"); // 로그인한 사용자 userNo

    function challengePage(){
        window.location.href = "http://localhost:3000/ChallengeRoomCreate?userNo="+userNo
    }

    return(
        <button className="menuBtn" onClick={challengePage}>챌린지 페이지</button>
    );
};

export default Challenge;