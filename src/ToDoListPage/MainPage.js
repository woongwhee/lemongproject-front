import React, { useState } from "react";
import { Component } from "react";
// 메인페이지 css
import './MainPage.css';
//프로필 컴포넌트
import Profile from "./profile/Profile";
//캘린더 Api 컴포넌트
import Calendar from './calendar/Calendar';
//메뉴바 컴포넌트
import Menubar2 from "./menubar/Menubar2";
import {Button} from "@mui/material";
import {useLoginDispatch} from "../Member/LoginContext";
import axios from "axios";

// import btnLogo from '../mypage/image/menu1.png';

//캘린더 라이브러리 추가 해주기
//npm install react-calendar

//리액트 두투라이브러리 추가
// npx create-react-app react-todolist
// npm i react-icons styled-components


function LogoutButton() {
    const dispatch= useLoginDispatch();
    const logout=async ()=>{
        await axios.get("/api/member/logout");

        dispatch({
            type:"logout"
        });
    }


    return (
        <Button onClick={logout}>
            로그아웃
        </Button>

    );
}

function MainPage() {
    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    return(

        <div className="outer">
            <LogoutButton></LogoutButton>
            {/* 캘린더 영역 */}
            <div className="outer_date">
                {/* <Profile/> */}
                <br/><br/>
                <Calendar/>
            </div>
            {/*메인menubar */}
          <Menubar2/>
            {/*사이드바 영역 */}
            <div className="outer_menu">
                <div className="menuBtn">
                    <button className="mybtn1"
                        onClick={() => setMenuClick((!menuClick))}></button>
                    {/* <button className="mybtn1" style={{backgroundImage: `url(${plusLogo})` , height}}></button> */}
                </div>
                {/* {menuClick === true ? <Mymenu/> : null} */}
            </div>
        </div>
    );
};

export default MainPage;
