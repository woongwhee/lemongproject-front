import React from 'react';
import {Card} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_CHALLENGE} from "../../reducer/menu";

const ChallengeReadyCard = (props) => {
    const {challengeNo,title,startDate,endDate,userCount}=props.challenge;
    let dispatch = useDispatch();
    const openDetail=()=>{
        dispatch({type: MENU_CHALLENGE, challengeNo})
    }
    return (
        <div className="challengeCard" onClick={openDetail}>
            <h3>{title}</h3>
            <div>{startDate.toString()}~{endDate.toString()}</div>
            <div>참여중 : {userCount}</div>
        </div>
    );
};

export default ChallengeReadyCard;
