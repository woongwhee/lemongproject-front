import React from "react";
import { Component } from "react";

class Mymenu extends Component{
    render(){
        return(
            <div className="outer_myMenu">
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
};

export default Mymenu;