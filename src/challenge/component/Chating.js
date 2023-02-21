import React, {useCallback, useRef, useState, useEffect} from 'react';
import SockJs from "sockjs-client";
import '../style/chat.scss';
import ProfileIcon from "../../mypage/ProfileIcon";
import {useLoginState} from "../../member/LoginContext";
import {CHAT_SOCKET} from "../challengeURI";


const Chat = ({chatList, challengeNo, playerList, isOpen, addChat}) => {
        const msg = useRef(null);
        const myNo = useLoginState().profile.userNo;
        const [socketConnect, setSocketConnect] = useState(false);
        const ws = useRef(null);
        useEffect(() => {
            //console.log("응애");
            if (isOpen) {
                console.log("ws", "열기시작")
                webSocketLogin()
                console.log("ws", "열기종료")
                let talk = document.querySelector("#talk");
                talk.scrollTop = talk.scrollHeight;

            } else {
                ws.current.close()
                ws.current = null;
            }
            return () => {
            }
        }, [isOpen])

        const webSocketLogin = useCallback(
            async () => {
                ws.current = await new SockJs(CHAT_SOCKET);
                console.log("여기옴", ws.current)
                ws.current.onmessage = onMessage;
                ws.current.onopen = onOpen;
                ws.current.onclose = onClose;
            }, [])

        const onOpen = useCallback(() => {
            console.log("열렸으")
        }, [ws])
        const onClose = useCallback(
            () => {
                if (isOpen) {
                    console.log("재연결중")
                    setTimeout(() => {
                        webSocketLogin();
                    }, 2000)
                }

            },
            [ws]
        );

        const onMessage = (message) => {
            //console.log(message);
            addChat(JSON.parse(message.data));

            setTimeout(() => {
                    let talk = document.querySelector("#talk");
                    talk.scrollTop = talk.scrollHeight;
                }, 10
            )

        }

        useEffect(() => {
            setTimeout(() => {

                let talk = document.querySelector("#talk");

                talk.scrollHeight = talk.scrollTop;
            }, 100)
        }, [chatList]);

        const send = async () => {
            if (!ws.current) {
                await webSocketLogin();
            }
            if (msg.current.value !== '') {
                if (ws.current.readyState != 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                    ws.current.send(msg.current.value);
                }
            } else {
                alert("메세지를 입력하세요.");
                document.getElementById("msg").focus();
                return;
            }
            msg.current.value = "";
        }

        return (
            <>
                {/* <GlobalStyle/> */}
                <div id="chat-wrap">
                    <div id='chatt'>
                        <h1 id="title">Chatting</h1>
                        {/* <br/> */}
                        <div id='talk' className='talk' style={{overflow: 'scroll'}}>
                            {chatList.map((chat, idx) => (
                                <>
                                <div className='uu'>
                                    <div key={idx} className={chat.userNo === myNo ? 'me2' : 'other2'}>
                                        <div className='userPic'><ProfileIcon profile={playerList?.find(e => e.userNo = chat.userNo)}></ProfileIcon></div>
                                    </div>
                                    <div key={idx} className={chat.userNo === myNo ? 'me' : 'other'}>
                                        <div className='chatMsg'>{chat.chatMessage}</div>
                                    </div>
                                    <div key={idx} className={chat.userNo === myNo ? 'me3' : 'other3'}>
                                        <div className='chatDate'>{chat.sendAt}</div>
                                    </div>
                                </div>
                                </>
                            ))}
                        </div>
                        <br/>
                        <br/>
                        <div id='sendZone'>
                            <textarea id='msg' ref={msg} onKeyDown={(ev) => {
                                if (ev.keyCode === 13) {
                                    send();
                                }
                            }}></textarea>
                            <input type='button' value='전송' id='btnSend' onClick={send}/>
                        </div>
                    </div>
                </div>
            </>
        );
    }
;

export default Chat;