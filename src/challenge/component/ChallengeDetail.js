import React from 'react';
import apiHoc from "../../util/apiHoc";
import {Button} from "reactstrap";
import {cancelMulti, joinMulti} from "../challengeApi";
import {useLoginState} from "../../member/LoginContext";
import '../style/ChallengeList.css';
import { BsArrowLeftCircle} from 'react-icons/bs'
import { FaLemon } from 'react-icons/fa';
import {useChallengeDispatch} from "../ChallengeContext";

const ChallengeDetail = ({result}) => {
    const {challengeNo, challengeTitle, challengeInfo, startDate, LocalDate, endDate,readyUsers,todoPreview} = result;
    const {userNo}=useLoginState().profile;
    const isReady=readyUsers.find(e=>e.userNo==userNo)==undefined?true:false
    let dispatch = useChallengeDispatch();
    const join = async () => {
        let res = await joinMulti(challengeNo);
        alert(res);
    }
    const cancel = async () => {
        let res = await cancelMulti(challengeNo);
        alert(res);
    }
    const backtoList=()=>{
        dispatch({type:'LIST'})
    }
    const countUser = readyUsers.length;
    
    const chStartDate = (startDate[0]).toString()+"년 "+(startDate[1].toString())+"월 "+(startDate[2]).toString()+"일"; 
    const chEndDate = (endDate[0]).toString()+"년 "+(endDate[1].toString())+"월 "+(endDate[2]).toString()+"일";     
    const chStartDate2 = (endDate[0]).toString()+"년 "+(endDate[1].toString())+"월 "+(endDate[2]+1).toString()+"일"; 

    return (
        <div className='chDetail'>
            <div className='dtBtn'>
                <div className='btnBack' onClick={backtoList} >
                    <BsArrowLeftCircle />
                </div>
                <div className='btnss'>
                    {isReady?<Button onClick={join}>흐에</Button>:<Button onClick={cancel}>포기할래요</Button>}
                </div>
            </div>
            <div className='dtTitle'>{challengeTitle}</div>
            <div className='dtDate'>모집일 : {chStartDate}~{chEndDate}</div>
            <div className='dtCountUser'>참여인원 : {countUser}명</div>
            <div className='dtStart'>시작일 : {chStartDate2}</div>
            <div className='dtInfo'>챌린지 소개 </div>
            <div className='dtInfo2'>{challengeInfo}</div>

            <div className='dtTodo'>{todoPreview.todoList.map( todo =>
                <div>
                    <div className='CheckCircle'><FaLemon/></div>
                    <div className='chDtTodo' todo={todo}>{todo.todoContent}</div>
               </div>
            )}</div>
            
            <div className='dtCountUser2'>참여 인원 ( {countUser} )</div>
            <div className='dtUser'> {readyUsers.map(user =>
                <>
                    <div className='dtUserPic'><img src={user.photo.filePath}  alt={user.nickName}></img></div>
                    <div className='dtUserNic' user={user}>{user.nickName}</div>
                </>
                )}
            </div>
        </div>
    );
};

export default apiHoc(ChallengeDetail);
