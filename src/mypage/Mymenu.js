import React , {useState , useEffect} from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import MyAlert from "./MyAlert";
import MySearch from "./MySearch";

function Mymenu(){

    const [tab , setTab] = useState("Search");

    const changeTab = (tabName) => {
        setTab(tabName);
    }

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
                <button className="myBtn" style={{marginLeft:'60px'}} onClick={() => changeTab("Search")}>검색</button>
                <button className="myBtn" onClick={() => changeTab("Alert")}>알림</button>
            </div>
            {tab === "Search" ? <MySearch/> : null}
            {tab === "Alert" ? <MyAlert/> : null}
        </div>
    )
};

export default Mymenu;