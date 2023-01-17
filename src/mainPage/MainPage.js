<<<<<<< HEAD
import React from 'react';
// import './Main.css';
=======
import React, { useState } from "react";
import { Component } from "react";
// 메인페이지 css
import './Main.css';
//프로필 컴포넌트
import Profile from "./Profile";
//캘린더 Api 컴포넌트
import Calendar from "./Calendar";
import MenuBar from "./MenuBar";



import btnLogo from '../mypage/image/menu1.png';



// Tab -> 각 카테고리(피드 , 챌린지 , 템플릿)별 페이지 보여주기.
// import {TabContent , TabPane , Nav , NavItem , NavLink} from "reactstrap";


>>>>>>> 68070044ecab981d1b157de8a28646eb8bc05240

function MainPage() {
    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    return(

        <div className="outer">
            {/* 캘린더 영역 */}
            <div className="outer_date">
                <Profile/>
                <br/><br/>
                <Calendar/>
            </div>

            {/*메인menubar */}
            <MenuBar/>
            

            {/*사이드바 영역 */}
            <div className="outer_menu">
                <div className="menuBtn">
                    <button className="mybtn1" style={{backgroundImage: `url(${btnLogo})`}}
                        onClick={() => setMenuClick((!menuClick))}></button>
                    {/* <button className="mybtn1" style={{backgroundImage: `url(${plusLogo})` , height}}></button> */}
                </div>
                {/* {menuClick === true ? <Mymenu/> : null} */}
            </div>
        </div>
    );
};

export default MainPage;
