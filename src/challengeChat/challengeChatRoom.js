import React , {useState , useEffect} from "react";
import axios from "axios";

import './challenge.css';
import croomImage from'./image/채팅방 이미지.jpg';

function ChallengeChatRoom(props){

    // challengeChatRoom에서 넘겨받은 챌린지 정보들
    let{challengeData}=props;

    // 사용할 변수들 셋팅
    const userNo = sessionStorage.getItem("userNo"); // 로그인한 사용자 userNo
    const challengeNo = 3000; // 테스트 챌린지 번호 3000
    const challengeTitle = challengeData?.challengeTitle; // 챌린지 번호에 해당하는 챌린지 제목
    const templateNo = challengeData?.templateNo; // 가져온 템플릿 번호
    const contextPath = ";"

    return(
        <div className="chatting-area" >
            <img src={croomImage} alt="채팅방 배경" style={{width:'723px' , height:'1214px'}}></img>
            <ul className="display-chatting">
                {/* 내가 보낸 메세지 */}
                <li className="myChat">
                    <span className="chatDate"></span> {/* 채팅 보낸 날짜 */}
                    <p className="chat"></p> {/* 보낸 채팅 메시지 */}
                </li>
                {/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ */}
                {/* 상대방이 보낸 메세지 */}
                <li>
                    <p className="chat"></p> {/* 보낸 채팅 메시지 */}
                    <span className="chatDate"></span> {/* 채팅 보낸 날짜 */}
                </li>
            </ul>
            <div className="input-area">
                <textarea className="inputChatting"></textarea>
                <button className="send">보내기</button>
            </div>

        {/* 스크립트 부분 */}
        {/* sockjs */}
	    <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>

        </div>
    );
};

export default ChallengeChatRoom;