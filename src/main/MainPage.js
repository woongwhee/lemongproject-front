import React, { useState } from "react";
import { Component } from "react";
// 메인페이지 css
import './MainPage.css';
//프로필 컴포넌트
import Profile from "./profile/Profile";
//캘린더 Api 컴포넌트
import Calendar from './calendar/Calendar';
//메뉴바 컴포넌트

import axios from "axios";
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import FeedInsert from "../feed/FeedInsert";
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton} from "@mui/material";
import ChallengeChatRoom from "../challengeChat/challengeChatRoom";
import { useLoginDispatch } from "../member/LoginContext";
import { useLoginState } from "../member/LoginContext";
import Menubar4 from "./menubar/Menubar4";
import Header from "./Header";




function MainPage() {
    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    let {profile}=useLoginState();
    console.log(profile);
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    return(
        <>
            <Header/>
            {/*<MainMenuBar profile={profile}/>*/}

        <main className="outer">
            {/* 캘린더 영역 */}
            <div className="outer_date">
                <Profile/>
                <br/><br/>
                <Calendar/>
            </div>
          {/*<Menubar2/>*/}
          {/*<Menubar3/>*/}
            <Menubar4/>
        </main>
    </>
            );
}

export default MainPage;
