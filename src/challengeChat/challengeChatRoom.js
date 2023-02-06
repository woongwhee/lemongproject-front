import React , {useState , useEffect} from "react";
import axios from "axios";
import './challenge.css';

import { CiBellOn , CiSearch , CiUser , CiHome , CiLogout , CiMedal , CiCirclePlus} from "react-icons/ci";
import {Nav} from 'react-bootstrap';
import MySearch from "../mypage/MySearch";
import MyAlert from "../mypage/MyAlert";

function ChallengeChatRoom(props){

    // challengeChatRoom에서 넘겨받은 챌린지 정보들
    let{challengeData}=props;

    // 사용할 변수들 셋팅
    const userNo = sessionStorage.getItem("userNo"); // 로그인한 사용자 userNo
    const challengeNo = 3000; // 테스트 챌린지 번호 3000
    const challengeTitle = challengeData?.challengeTitle; // 챌린지 번호에 해당하는 챌린지 제목
    const templateNo = challengeData?.templateNo; // 가져온 템플릿 번호
    const contextPath = "/api"; // 근데 프록시 설정이 되어있어서 필요없을거같음.

    // 버튼 클릭 시 검색창 보이게 하기.
    const [searchClick , setSearchClick] = useState("");

    // 버튼 클릭 시 알림창 보이게 하기.
    const [clickBtns , setClickBtns] = useState(false);

    // 버튼 클릭 시 알림창 보이게 하기.
    const [clickBtns2 , setClickBtns2] = useState("");

    const changeTab = (tabName) =>{
        setSearchClick(tabName);
    }

    function MovePage(){
        window.location.href = "http://localhost:3000/MyPageUpdate?userNo="+userNo
    }

    function MoveMainPage(){
        window.location.href = "http://localhost:3000/mypage?userNo="+userNo
    }

    function challengePage(){
        window.location.href = "http://localhost:3000/ChallengeRoomCreate";
    }

    return(
        <div class="container-fluid" style={{position:'absolute'}}>
            <div class="row">
                <div class="col-sm-auto bg-light sticky-top" style={{width:'60px' , boxSizing:'border-box' , height:'1030px'}}>
                    <div class="d-flex flex-sm-column flex-row flex-nowrap bg-light align-items-center sticky-top">
                        <a href="/" class="d-block p-3 link-dark text-decoration-none" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Icon-only">
                            <i class="bi-bootstrap fs-1"></i>
                        </a>
                        <ul class="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                            <li class="nav-item">
                                <a id="hbtn" href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Home" onClick={MovePage}>
                                    <CiUser class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiUser>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" onClick={() => setClickBtns(!clickBtns)} href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Dashboard">
                                    {/* <i class="bi-speedometer2 fs-1"></i> */}
                                    <CiSearch class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiSearch>
                                    <label id="check-btn"></label>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" onClick={() => setClickBtns2(!clickBtns2)} href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Orders">
                                    {/* <i class="bi-table fs-1"></i> */}
                                    <CiBellOn class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiBellOn>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Products" onClick={MoveMainPage}>
                                    {/* <i class="bi-heart fs-1"></i> */}
                                    <CiHome class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiHome>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                                    {/* <i class="bi-people fs-1"></i> */}
                                    <CiCirclePlus class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiCirclePlus>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" onClick={challengePage} href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                                    {/* <i class="bi-people fs-1"></i> */}
                                    <CiMedal class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiMedal>
                                </a>
                            </li>
                            <li>
                                <a id="hbtn" href="#" class="nav-link py-3 px-2" title="" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-original-title="Customers">
                                    {/* <i class="bi-people fs-1"></i> */}
                                    <CiLogout class="bi-house fs-1" style={{color:'black' , width:'30px' , marginLeft:'-5px'}}></CiLogout>
                                </a>
                            </li>
                        </ul>
            
                    </div>
                </div>
                <div class="col-sm p-3 min-vh-100">
                    <div>
                    {clickBtns === true ? 
                        // <div style={{border:'1px solid green' , width:'20%' , marginLeft:'-15px' , height:'1070px' , marginTop:'-16px'}}>
                        <MySearch/> : null}
                    </div>
                    {clickBtns2 === true ? 
                        // < style={{border:'1px solid blue' , width:'20%' , marginLeft:'-15px' , height:'1070px' , marginTop:'-16px'}}>
                    <MyAlert/> : null}
                </div>
            </div>
        </div>
    );
};

export default ChallengeChatRoom;