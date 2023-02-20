import React, {useState, useEffect, useRef} from "react";
import {Component} from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
//선언하지 않아도, 디바이스 혹은 locale의 시간을 불러온다. 
import 'moment/locale/ko';

import './MyPage.css';
import '../mypage/font/font.css';
import {useLoginState} from "../member/LoginContext";
import {codeHandler} from "../util/apiUtil";
import ChallengeRoomModal from "../challenge/component/ChallengeRoomModal";

import { FcOk } from "react-icons/fc";

function MyChallenge() {
    const userNo = useSelector((state) => state.menu.userNo);
    const myNo = useLoginState().profile.userNo;
    // 현재 내가 참여하고 있는 챌린지 리스트
    const [challList, setChallList] = useState([]);
    const challengeNo = useRef(0);
    // 챌린지 상세보기
    useEffect(
        () => {
            axios.get(`/api/challenge/list/room/${userNo}`).then((res) => {
                return codeHandler(res)
            }).then(data => {
                setChallList(data);
                console.log(data);
            }).catch(function () {
                console.log("데이터 수신실패");
            })

        }, [userNo])

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(e => !e);
    const openRoom = async (roomNo) => {
        if (myNo == userNo) {
            challengeNo.current = roomNo;
            console.log(roomNo, "룸");
            setIsOpen(true);
        }
    }
    return (
        <div className="outer_Chall" style={{overflow:'scroll'}}>
            <div>
                {challList.map((e, index) =>
                    <div id="myChalldiv" key={index} className="outer_myChallList" class="btn btn-outline-dark" style={{borderRadius: '0', width: '49.3%' , marginTop:'3px' , marginLeft:'3px' , boxShadow:'1px 1px 3px #000' , border:'0px'}} data-bs-toggle="modal"
                        onClick={() => {
                            if (e.status == 'PLAY') {openRoom(e.challengeNo)}else{console.log(e.challengeNo,"아닌데??")}
                        }}
                        >
                        <h1 style={{float: 'left', fontFamily: 'SourceSansPro-Black' , fontSize:'27px'}}>
                            <b>{e?.title}</b></h1> 
                        <br/><br/><br/>
                        <h4 style={{float: 'left', fontFamily: 'SourceSansPro-Light' , fontSize:'20px'}}>
                            <b>{moment(e.startDate).format('YYYY년 MM월 DD일')} ㅡ {moment(e.endDate).format('YYYY년 MM월 DD일')}</b><br></br>
                            <FcOk style={{float:'left' , marginTop:'7px'}}/> <span style={{fontFamily:'NanumGothic-Regular' , fontSize:'17px' , marginTop:'7px' , float:'left' , marginLeft:'5px'}}>참여 중</span>
                        </h4>
                    </div>
                )}
            </div>
            <ChallengeRoomModal isOpen={isOpen} toggle={toggle} challengeNo={challengeNo.current}/>
        </div>
    )
};

export default MyChallenge;
