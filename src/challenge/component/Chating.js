import React, { useCallback, useRef, useState, useEffect } from 'react';

import '../style/chat.scss';
import ProfileIcon from "../../mypage/ProfileIcon";
import {useLoginState} from "../../member/LoginContext";
import challenge from "../../challengeChat/challenge";
import {CHAT_SOCKET} from "../challengeURI";

const Chat = ({chatList,challengeNo,playerList}) => {
    const [msg, setMsg] = useState("");
    const myNo=useLoginState().profile.userNo;
    const [chatt, setChatt] = useState(chatList);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const [players,setPlayers]=useState(playerList);
    const ws = useRef(null);    //
    useEffect(() => {
        if(socketData !== undefined) {
            const tempData = chatt.concat(socketData);
            console.log(tempData);
            setChatt(tempData);
        }
    }, [challengeNo])

    const onText = event => {
        setMsg(event.target.value);
    }

    const webSocketLogin = useCallback(() => {
        ws.current = new WebSocket(`${CHAT_SOCKET}/${challengeNo}`);
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            const newChat=[...chatt,dataSet];
            setChatt(newChat);
            setSocketData(dataSet);
        }
    });
    const send = useCallback(() => {
        if(!chkLog) {
            webSocketLogin();
            setChkLog(true);
        }
        if(msg !== ''){
            const data = {
                userNo:myNo,
                challengeNo,
                chatMessage:msg,
                msg,
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

    (function(){
        const displayChatting = document.getElementsByClassName("talk")[0];
        if(displayChatting != null){
            displayChatting.scrollTop = displayChatting.scrollHeight;
           }
    })();


    
    return (
        <>
            {/* <GlobalStyle/> */}
            <div id="chat-wrap">
                <div id='chatt'>
                    <h1 id="title">WebSocket Chatting</h1>
                    <br/>
                    <div id='talk' className='talk' style={{overflow:'scroll'}}>
                        <div className='talk-shadow'></div>
                        {chatt.map((chat, idx) => (
                            <div key={idx} className={chat.userNo === myNo ? 'me' : 'other'}>
                               <div style={{marginLeft:'-10px'}}><ProfileIcon profile={players.find(e=>e.userNo=chat.userNo)}></ProfileIcon></div>
                               <div style={{width:'100%'}}>{chat.chatMessage}</div><br/>
                                <span style={{marginTop:'-100px'}}>{chat.sendAt}</span>
                            </div>
                        ))}

                    </div>
                    <div id='sendZone'>
                        <textarea id='msg' value={msg} onChange={onText} onKeyDown={(ev) => {if(ev.keyCode === 13){send();}}}></textarea>
                        <input type='button' value='전송' id='btnSend' onClick={send}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Chat;