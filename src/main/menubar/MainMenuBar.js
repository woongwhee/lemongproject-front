import React, { useState } from "react";
import { Component } from "react";

import Offcanvas from 'react-bootstrap/Offcanvas';
import MenuIcon from '@mui/icons-material/Menu';
import {IconButton} from "@mui/material";
import FeedInsert from "../../feed/FeedInsert";
import MySearch from "../../mypage/MySearch";
import Challenge from "../../challengeChat/challenge";
import { KAKAO_LOGOUT_URL } from '../../api/KakaoLoginData';
import {useLoginState} from "../../member/LoginContext";
import { useLoginDispatch } from "../../member/LoginContext";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import '../../mypage/MyPage.css';

// 버튼 아이콘
import { CiBellOn , CiSearch , CiUser , CiHome , CiLogout , CiMedal , CiSquarePlus} from "react-icons/ci";
import {Nav} from 'react-bootstrap';
import MyAlert from "../../mypage/MyAlert";


function MainMenuBar(props){
    
    let{myprofile}=props;
    // let{profile}=props;

    let {profile}=useLoginState();
    console.log(profile);
    const userNo = profile?.userNo; // 로그인한 사용자 userNo

    // const dispatch= useLoginDispatch();
    
    // function logout(){
    //     axios.get("/api/member/logout");
    
    //     dispatch({
    //         type:"logout"
    //     });
    // }

    const dispatch= useLoginDispatch();
    const logout = async () => {
        let res = await axios.get("/api/member/logout");
        if(res.data.code === '3008') {
            console.log(res.data)
            logoutKakao()
            console.log("로그아웃 완료")
        }
        dispatch({
            type:"logout"
        });
    }

    const logoutKakao = () => {
        const kakaoLogout = KAKAO_LOGOUT_URL;
        document.location.href = kakaoLogout;
    }

    
    
    // const Myprofile=useLoginState().profile;
    // const photo=Myprofile.photo;

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // 홈으로 이동하는 함수
    function goHome(){
        window.location.href = "http://localhost:3000/";
    }

    // 회원정보 수정 페이지로 이동하는 함수
    function goUser(){
        window.location.href = "http://localhost:3000/MypageUpdate?userNo="+profile?.userNo;
    }

    let [tab, setTab] = useState(0);

    function TabContent(props){
        if(props.tab === 0){
          return <div style={{}}><MySearch/></div>
        }else if(props.tab === 1) {
          return <div><MyAlert/></div>
        }else if(props.tab === 2) {
            return <div>
                <div><FeedInsert></FeedInsert></div>
                <div><Challenge userNo={userNo}/></div>
            </div>
        }else if(props.tab === 3) {
            return <div></div>
        }else if(props.tab === 4) {
            return <div></div>
        }else if(props.tab === 5) {
            return <div></div>
        }
      }

    return(
        <div style={{}}>
             <IconButton aria-label="delete" size="large" onClick={handleShow} style={{float:"right"}}>
                <MenuIcon fontSize="inherit" />
            </IconButton>
            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title></Offcanvas.Title>
                <br/>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {/* 유저 프로필 / 닉네임 부분 */}
                <img src={profile?.photo?.filePath+profile?.photo?.changeName} style={{width:'50px' , height:'50px' , borderRadius:'50%'}}></img>
                <p style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px' , marginTop:'-60px' , marginLeft:'60px'}}>{profile?.nickName}</p>
                <p style={{marginLeft:'60px' , marginTop:'-20px'}}>{profile?.profileComment}</p>
                <hr style={{marginTop:'30px'}}/>
                
                {/* 버튼 모음 */}
                <div style={{marginTop:'-50px'}}>
                    {/* 피드 작성 버튼 */}
                    {/* <FeedInsert></FeedInsert> */}
                    {/* 홈 버튼(메인 페이지로 이동하는 버튼) */}
                    {/* <CiHome onClick={goHome} id="hbtn" style={{fontSize:'40px' , marginTop:'-1135px' , marginLeft:'50px'}}></CiHome> */}
                    {/* 회원정보 수정 페이지 이동 버튼 */}
                    {/* <CiUser onClick={goUser} id="hbtn" style={{fontSize:'40px' , marginTop:'-1135px' , marginLeft:'7px'}}></CiUser> */}
                    {/* 로그아웃 */}
                    {/* <CiLogout onClick={logout} id="hbtn" style={{fontSize:'40px' , marginTop:'-1135px' , marginLeft:'3px'}}>로그아웃</CiLogout> */}
                </div>
            <br/> 
            <div>
            <Nav className="mt-5 mb-3" variant="tabs" defaultActiveKey="link-0" style={{border:'0'}}>
                <Nav.Item>
                    <Nav.Link eventKey="link-0" onClick={()=>{setTab(0)}}><CiSearch id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiSearch></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={()=>{setTab(1)}}><CiBellOn id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiBellOn></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-2" onClick={()=>{setTab(2)}}><CiSquarePlus id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiSquarePlus></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-3" onClick={()=>{setTab(3)}}><CiHome onClick={goHome} id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiHome></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-4" onClick={()=>{setTab(4)}}><CiUser onClick={goUser} id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiUser></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-5" onClick={()=>{setTab(5)}}><CiLogout onClick={logout} id="hbtn" style={{fontSize:'26px' , color:'black'}}></CiLogout></Nav.Link>
                </Nav.Item>
           </Nav>
            </div>
                <div style={{marginTop:"0px"}}>
                    <TabContent tab={tab}/>
                </div>
            </Offcanvas.Body>

            </Offcanvas>
        </div>
    )
}

export default MainMenuBar;