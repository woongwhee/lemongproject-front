import React , {useState , useEffect} from "react";
import { Component } from "react";
import axios from "axios";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import mark from './image/mark.png';

import '../mypage/font/font.css';

import MyFeed from "./MyFeed";
import MyChallenge from "./MyChallenge";
import MyTemplates from "./MyTemplates";
import Mymenu from "./Mymenu";
import MyFollowCount from "./MyFollowerCount";
import AcceptFollowCount from "./AcceptFollowCount";
import AcceptFollowingCount from "./AcceptFollowingCount";
import MyFollowingCount from "./MyFollowingCount";

import ChallengeChatRoom from "../challengeChat/challengeChatRoom";

// Tab -> 각 카테고리(피드 , 챌린지 , 템플릿)별 페이지 보여주기.
// import {TabContent , TabPane , Nav , NavItem , NavLink} from "reactstrap";

// 마이페이지 css
import './MyPage.css';
import MyFollowApplication from "./MyFollowApplication";

function MyPage() {

     // photo테이블에서 userNo에 해당하는 프로필 사진 정보 가져오기.
     const [myprofile , setMyProfile] = useState();
     
     const queryString = window.location.search;
     const params = new URLSearchParams(queryString);

     const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");
 
     function callback(data){
         setMyProfile(data);
     }
 
     useEffect(
         () => {
             axios.get("/api/member/selectMyProfile" , {
                 params:{
                     userNo : userNo ,
                 }
             }).then(function(res){
                 console.log("데이터 전송 성공");
                 const data = res.data.result;
                 console.log(data);
                 callback(data);
                 
             }).catch(function(){
                 console.log("데이터 전송 실패");
             });
         } , []
     );

     let saveFilePath = "http://localhost:8081/api/images/";

    // Apikey를 환경변수를 이용해 숨기기.
    const apiKey = process.env.REACT_APP_CAL_API_KEY;

    // 버튼 클릭 시 Feed , Challenge , Template 보이게 하기.
    const [tab , setbtnClick] = useState("Feed"); // Feed

    // 버튼 클릭 시 Menu 보이게 하기.
    const [menuClick , setMenuClick] = useState(false);

    const changeTab = (tabName) =>{
        setbtnClick(tabName);
    }

    // 세션의 user_no와 파람의 user_no를 비교하여 해당하는 팔로워 보여주기.
    function followerComparison(){
        if(params.get("userNo") === sessionStorage.getItem("userNo")){
            return <MyFollowCount/>
        }else{
            return <AcceptFollowCount/>
        }
    }

    function followingComparison(){
        if(params.get("userNo") === sessionStorage.getItem("userNo")){
            return <MyFollowingCount/>
        }else{
            return <AcceptFollowingCount/>
        }
    }
 
    return(
        <div>
            <ChallengeChatRoom />
            <div style={{position:'absolute'}}>
            <div className="outer" style={{position:'absolute'}}>
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
                            <img src={myprofile?.photo?.filePath+myprofile?.photo?.changeName} style={{marginLeft:'7px' , marginTop:'0px'}} className="profileImg"></img>
                        </div>
                        <div className="outer_id">
                            <p className="nickFont" style={{marginTop:'7px'}}><b>{myprofile?.nickName}</b><img src={mark} style={{width:'25px' , height:'25px' , marginLeft:'7px' , marginTop:'-5px'}}/></p>
                        </div>
                        <br/>
                        <div className="outer_fall">
                            <div className="followsize">
                                <p style={{fontSize:'23px' , fontFamily:'NanumGothic-Regular'}}>게시글&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    팔로잉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팔로워</p>
                                    {followerComparison()}
                                    {followingComparison()}
                            </div>
                        </div>
                        <div className="outer_content">
                            <p style={{fontFamily:'NanumGothic-Regular' , fontSize:'17px'}}>{myprofile?.profileComment}</p>
                            <MyFollowApplication/>
                            
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
                {/* <div className="outer_menu">
                    <div className="menuBtn">
                        <button className="mybtn1" style={{backgroundImage: `url(${btnLogo})`}}
                            onClick={() => setMenuClick((!menuClick))}></button>
                    </div> */}
                    {/* {menuClick === true ? <Mymenu myprofile={myprofile}/> : null} */}
                {/* </div> */}
            </div>
            </div>
        </div>
    );
};

export {MyPage};
