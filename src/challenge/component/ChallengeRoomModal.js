import React, {useEffect, useState} from 'react';
import moment from "moment/moment";
import ProfileIcon from "../../mypage/ProfileIcon";
import {useLoginState} from "../../member/LoginContext";
import Chat from "./Chating";
import ChallengeRank from "./ChallengeRank";
import {RoomDetail} from "../challengeApi";
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const ChallengeRoomModal = ({challengeNo, isOpen, toggle}) => {
    const myNo = useLoginState().profile.userNo;
    const [detail, setDetail] = useState({
        challengeTitle: "",
        challengeNo: "",
        startDate: "",
        endDate: ""
    });
    const [chatList, setChatList] = useState([]);
    const [playerList, setPlayerList] = useState([]);
    const loadRoom = async (challengeNo) => {
        let newDetail = await RoomDetail(challengeNo);
        console.log(newDetail);
        setDetail(newDetail);
        setChatList(newDetail.chatList);
        setPlayerList(newDetail.playerList);
    }
    const addChat = (chat) => {
        setChatList(e => [...e, chat]);
    }
    useEffect(
        () => {
                console.log("???")
                loadRoom(challengeNo);
        }, [challengeNo])

    return (
        <Modal isOpen={isOpen} toggle={toggle} size="xl" style={{width:'1003px'}}>

            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody >
                <div className="detail-header">
                    <h1 style={{fontSize: '25px'}}><b>{detail.challengeTitle}</b></h1>
                    <h3 style={{fontSize: '20px'}}>{moment(detail.startDate).format('YYYY년 MM월 DD일')} ㅡ {moment(detail.endDate).format('YYYY년 MM월 DD일')}</h3>
                    <h3 style={{fontSize: '25px'}}>
                        <b>내 달성율{playerList.find(e => e.useNo == myNo)?.percent}% </b>
                    </h3>
                </div>
                <div class="">
                    <div>
                        <div className="outer_all">
                            <ChallengeRank playerList={playerList}/>
                            <div className="outer_2">
                                <Chat isOpen={isOpen} challengeNo={challengeNo} chatList={chatList} addChat={addChat}
                                      playerList={playerList}></Chat>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
        </Modal>
    )
};
export default ChallengeRoomModal;


