import React from 'react';
import {Card} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_CHALLENGE} from "../../reducer/menu";
import '../style/ChallengeList.css';
import {useChallengeDispatch} from "../ChallengeContext";

const ChallengeReadyCard = (props) => {
    const {challengeNo,title,startDate,endDate,userCount,createUser}=props.challenge;
   
    let dispatch = useChallengeDispatch();

    const detailView = (challengeNo) => {
        dispatch({
            type:"DETAIL",challengeNo
        })
    }

    //console.log(createUser.nickName);

    return (
        <div className="challengeCard" onClick={()=>{detailView(challengeNo)}}>
            <div className='chTitle'><h3>{title}</h3></div>
            <div className='chDate'>{startDate.toString()}~{endDate.toString()}</div>
            <div className='chCount'>참여중 : {userCount}</div>
            <div className='chWriter'>{createUser.nickName}</div>
            <div className='chWriterPic'><img className="profile" src={createUser.filePath} alt={createUser.photo?.originName}/></div>
        </div>
    );
};

export default ChallengeReadyCard;
