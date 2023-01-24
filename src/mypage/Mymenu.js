import React , {useState , useEffect} from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

function Mymenu(){
 
    return(
        <div className="outer_myMenu">
            <Link to="/MyPageUpdate">
                <button className="menuBtn">마이페이지</button>
            </Link>
                {/* <button className="menuBtn">피드작성</button> */}
            <div className="outer_menuPro">
                <p>프로필</p>
            </div>
            <div className="outer_3menu">
                <p>검색 , 알림 , 로그아웃</p>
            </div>
            <div className="outer_search">
                <p>검색창</p>
            </div>
            <div className="outer_req">
                <p>결과들</p>
            </div>
        </div>
    )
};

export default Mymenu;