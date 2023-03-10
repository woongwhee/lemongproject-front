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
import { useLoginState } from "../member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';
import UserNo from "../reducer/userNo";
import { color } from "@mui/system";
import Photo from "../main/profile/ProfilePhoto";

function MyPage() {
    
    let {profile}=useLoginState();
    // console.log(profile);
    // const userNo = profile?.userNo; // 로그인한 사용자 userNo
    // console.log(userNo + 'dd?')
     // photo테이userNo블에서 userNo에 해당하는 프로필 사진 정보 가져오기.
     const [myprofile , setMyProfile] = useState();
    const userNo = useSelector((state) => state.menu.userNo);
    // console.log("No",userNo,"Nos",userNos)
     // console.log(userNos + " 제발 통과됨")
    //  const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");
 
     function callback(data){
         setMyProfile(data);
     }

    const selectUser = () => {
        axios.get("/api/member/selectMyProfile" ,{params:{userNo:userNo}}
            // {
            // params:{
            //     userNo : userNos != null ? userNos : userNo ,
            // }
        ).then(function(res){
            console.log("데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            callback(data);
        }).catch(function(){
            console.log("데이터 전송 실패");
        });
    }


     useEffect(() => {
        selectUser();
        console.log(userNo + "===여기도 통과됨")
      },[userNo])

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
        console.log(userNo + "뭐들어있냐")
        if(userNo === profile?.userNo){
            return <MyFollowCount userNo={userNo}/>
        }else{
            return <AcceptFollowCount userNo={userNo}/>
        }
    }

    function followingComparison(){
        if(userNo === profile?.userNo){
            return <MyFollowingCount userNo={userNo}/>
        }else{
            return <AcceptFollowingCount userNo={userNo}/>
        }
    }

    return(
        <div>
            {/* <ChallengeChatRoom /> */}
            <div style={{position:'absolute' , marginLeft:'-180px' , marginTop:'0px'}}>
            <div className="outer_my" style={{position:'absolute'}}>
                
                <div className="outer_prof">
                    <div className="outer_MyProf">
                        <div className="outer_proimgf">
                            <Photo photo={myprofile?.photo} style={{marginLeft:'7px' , marginTop:'0px' , width:'150px' , height:'150px'}} classname={"profileImg"}/>
                        </div>
                       <div>
                                <br/>
                                <div>
                                    <p style={{marginTop:'-150px' , marginLeft:'223px'}}><b>{myprofile?.nickName}</b></p>
                                    <div className="followsizef" style={{marginTop:'-15px' , marginLeft:'223px' , position:'absolute'}}>
                                        <p style={{fontSize:'17px' , fontFamily:'NanumGothic-Regular'}}>게시글&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            팔로잉&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;팔로워</p>
                                            <MyFollowCount userNo={userNo}/><MyFollowingCount userNo={userNo}/>
                                    </div>
                                </div>
                         </div>
                        <div className="outer_contentf">
                            <p style={{fontFamily:'NanumGothic-Regular' , fontSize:'17px' , marginTop:'80px' , position:'absolute'}}>{myprofile?.profileComment}</p>
                            <MyFollowApplication userNo={userNo}/>
                        </div>
                    </div>
                    <div className="outer_btnf">
                        <button className="myBtnf" onClick={() => changeTab("Feed")}><p style={{fontFamily:'NanumGothic-Regular'}}>Feed</p></button>
                        <button className="myBtnf" onClick={() => changeTab("Challenge")}><p style={{fontFamily:'NanumGothic-Regular'}}>Challenge</p></button>
                        <button className="myBtnf" onClick={() => changeTab("Template")}><p style={{fontFamily:'NanumGothic-Regular'}}>Template</p></button>
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
                    {/* <UserNo profile={profile}/> */}
            </div>
            </div>
        </div>
    );
};

export {MyPage};
