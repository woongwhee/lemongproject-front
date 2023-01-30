import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";
import FollowAccept from "./FollowAccept";

function MyAlert(props){

    let{myprofile}=props;

    return(
        <div className="outer_req2">
                <p>알림 결과들</p>
                <FollowAccept myprofile={myprofile}/>
        </div>
    )
}

export default MyAlert;