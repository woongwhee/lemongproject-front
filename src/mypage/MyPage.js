import React, { useState  } from "react";
import { Component } from "react";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import btnLogo from './image/menu1.png';

import MyFeed from "./MyFeed";
import MyChallenge from "./MyChallenge";
import MyTemplates from "./MyTemplates";
import Mymenu from "./Mymenu";

// Tab -> 각 카테고리(피드 , 챌린지 , 템플릿)별 페이지 보여주기.
// import {TabContent , TabPane , Nav , NavItem , NavLink} from "reactstrap";

// 마이페이지 css
import './MyPage.css';

function MyPage() {

    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Feed , Challenge , Template 보이게 하기.
    const [tab , setbtnClick] = useState("Feed"); // Feed

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    const changeTab = (tabName) =>{
        setbtnClick(tabName);
    }
 
    return(

        <div className="outer">
            <div className="outer_date">
                {/* <img src={dateLogo}/> */}
                <br/><br/><br/><br/><br/><br/>

                {/* 구글 API로 구글 캘린더 사용 */}
                <FullCalendar
                    plugins={[dayGridPlugin, googleCalendarPlugin]}
                    initialView="dayGridMonth"
                    googleCalendarApiKey={apiKey}
                    events={{
                    googleCalendarId: 'sung755666@gmail.com',
                    }}
                    eventDisplay={'block'}
                    eventTextColor={'#FFF'}
                    eventColor={'#F2921D'}
                    height={'660px'}
                    Toolbar
                 />
            </div>
            <div className="outer_pro">
                <div className="outer_MyPro">
                    <div className="outer_proimg">
                        <p>프로필 이미지</p>
                    </div>
                    <div className="outer_id">
                        <p>닉네임(아이디)</p>
                    </div>
                    <div className="outer_fall">
                        <p>게시물(개수) / 팔로잉 / 팔로워 </p>
                    </div>
                    <div className="outer_nick">
                        <p style={{fontSize: '10px'}}>별명</p>
                    </div>
                    <div className="outer_content">
                        <p>자기소개</p>
                    </div>
                </div>
                <div className="outer_btn">
                    <button className="myBtn" onClick={() => changeTab("Feed")}>Feed</button>
                    <button className="myBtn" onClick={() => changeTab("Challenge")}>Challenge</button>
                    <button className="myBtn" onClick={() => changeTab("Template")}>Template</button>
                </div>
                    {tab === "Feed" ? <MyFeed/> : null}
                    {tab === "Challenge" ? <MyChallenge/> : null}
                    {tab === "Template" ? <MyTemplates/> : null}
                </div>
            <div className="outer_menu">
                <div className="menuBtn">
                    <button className="mybtn1" style={{backgroundImage: `url(${btnLogo})`}}
                        onClick={() => setMenuClick((!menuClick))}></button>
                    {/* <button className="mybtn1" style={{backgroundImage: `url(${plusLogo})` , height}}></button> */}
                </div>
                {menuClick === true ? <Mymenu/> : null}
            </div>
        </div>
    );
};

export {MyPage};
