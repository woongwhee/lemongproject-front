import React , {useState , useEffect} from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import MyAlert from "./MyAlert";
import MySearch from "./MySearch";

function Mymenu(props){

    let{myprofile}=props;

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    const [tab , setTab] = useState("Search");

    const changeTab = (tabName) => {
        setTab(tabName);
    }

    function MovePage(){
        window.location.href = "http://localhost:3000/MyPageUpdate?userNo="+userNo
    }

    // 로그인 한 userNo와 주소의 userNo가 같을 경우 마이페이지 버튼 보여주기.
    function showBtn(){
        if(params.get("userNo") === sessionStorage.getItem("userNo")){
            return <button className="menuBtn" onClick={MovePage}>마이페이지</button>
        }
    }

    return(
        <div className="outer_myMenu">
            {/* <Link to="/MyPageUpdate?userNo="> */}
                {/* <button className="menuBtn" onClick={MovePage}>마이페이지</button> */}
                {showBtn()}
            {/* </Link> */}
                {/* <button className="menuBtn">피드작성</button> */}
            <div className="outer_menuPro">
                <p>프로필</p>
            </div>
            <div className="outer_3menu">
                <button className="myBtn" style={{marginLeft:'60px'}} onClick={() => changeTab("Search")}>검색</button>
                <button className="myBtn" onClick={() => changeTab("Alert")}>알림</button>
            </div>
            {tab === "Search" ? <MySearch myprofile={myprofile}/> : null}
            {tab === "Alert" ? <MyAlert/> : null}
        </div>
    )
};

export default Mymenu;