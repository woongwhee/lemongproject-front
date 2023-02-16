import React, { useCallback, useRef, useState, useEffect } from 'react';
import {createGlobalStyle} from 'styled-components';
import axios from "axios";
// import ChallengeRoomCreate from './challengeRoomCreate';
import {useDispatch, useSelector} from 'react-redux';
import { useLoginState } from "../Member/LoginContext";
const Chat = (props) => {

    let{chatData}=props;
    console.log(chatData);

    let chatRoomNo = chatData[0];
    console.log(chatRoomNo);

    let userNo = chatData[1];
    console.log(userNo);
    // let{chatRoomNo}=props;
    // let{userNo}=props1;
    let {profile}=useLoginState;
    console.log(profile);
    // console.log(userNo);
    // console.log(userNo)
    // const userNo = profile?.userNo; // 로그인한 사용자 userNo
    // const userNos = useSelector((state) => state.userNo.selectUserNo);

    // 소켓통신으로 보낸 챌린지 참여하는 유저의 
    // 이름 , 메세지 , 보낸시간(날짜포함) 저장
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const challengeNo = 3000; // 테스트 챌린지 번호 3000

    const ws = useRef(null);    //webSocket을 담는 변수, 
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userNos = params.get("userNo"); // 로그인한 사용자 userNo
    console.log(userNos);

    // 받은 데이터들 map돌려서 하나하나 빼서 쓰기                            
    const msgBox = chatt.map((item, idx) => (
        <div key={idx} className={item.name === name ? 'me' : 'other'}>
            <span><b>{userNos}</b></span> [ {item.date} ]<br/>
            <span>{item.msg}</span>
        </div>
    ));

    function showChat(){
        if(userNo === userNos){
            return<div style={{float:'right'}}>{msgBox}</div>
        }else{
            return<div style={{float:'left'}}>{msgBox}</div>
        }
    }

    // function GoChat(){
    //     // if(chatRoomNo === detailChallenges.chatRoomNo){
    //     //     return<div style={{float:'right'}}>{msgBox}</div>
    //     // }
    //     console.log(chatRoomNo)

    // }

    useEffect(() => {
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
            
        }
    }, [socketData]);


    // const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        
    // `;

    //webSocket

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }

    // 소켓 통신으로 스프링 백앤드 서버로 데이터 넘겨주기(JSON형태로 변경해서)
    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket("ws://localhost:8081/api/socket/chatt/"+chatRoomNo);

        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });

    const send = useCallback(() => {
        if(!chkLog) {
            if(userNos === "") {
                alert("이름을 입력하세요.");
                document.getElementById("name").focus();
                return;
            }
            webSocketLogin();
            setChkLog(true);
        }

        if(msg !== ''){
            const data = {
                userNos,
                msg,
                chatRoomNo,
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                } 
            }else {
                ws.current.send(temp);
            }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
    });

    //webSocket

    return (
        <>
            {/* <ChallengeRoomCreate/> */}
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1 id="title">WebSocket Chatting</h1>
                    <br/>
                    <div id='talk' style={{overflow:'scroll' , width:'483px' , height:'1050px'}}>
                        <div className='talk-shadow'></div>
                        {/* {msgBox} */}
                        {showChat()}
                    </div>
                    <input disabled={chkLog}
                        placeholder='이름을 입력하세요.' 
                        type='text' 
                        id='name' 
                        value={userNos} 
                        onChange={(event => setName(event.target.value))} style={{width:'200px' , height:'35px'}}/>
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText}
                            onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}} style={{width:'406px' , float:'left'}}></textarea>
                        <input type='button' value='전송' id='btnSend' onClick={send} style={{width:'76px' , height:'55px'}}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;