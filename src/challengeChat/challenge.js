import React , {useState , useEffect} from "react";
import axios from "axios";


function Challenge(){

    function challengePage(){
        window.location.href = "http://localhost:3000/ChallengeRoomCreate";
    }

    return(
        <button className="menuBtn" onClick={challengePage}>챌린지 페이지</button>
    );
};

export default Challenge;