import React from 'react';
import {Card} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_CHALLENGE} from "../../reducer/menu";
import '../style/ChallengeList.css';

import '../../mypage/font/font.css';

const ChallengeReadyCard = (props) => {
    const {challengeNo,title,startDate,endDate,userCount}=props.challenge;
   
    let dispatch = useDispatch();

    const openDetail=(challengeNo)=>{
        dispatch({type: MENU_CHALLENGE, challengeNo})
    }

    console.log(props.challenge);

    return (
        <div className="challengeCard" onClick={openDetail}>
            {/* <h3>{title}</h3> */}
            <div style={{marginTop:'10px' , marginLeft:'-95px' , position:'absolute'}}>
                <div style={{marginTop:'-217px' , marginLeft:'185px'}}><p style={{fontFamily:'Quicksand-Regular' , fontSize:'20px'}}><b>모집기간 :</b> {startDate.toString()} ~ {endDate.toString()}</p></div>
                <div style={{marginTop:'-20px' , marginLeft:'185px'}}><p style={{fontFamily:'Quicksand-Regular' , fontSize:'20px'}}><b>참여인원 :</b> {userCount}명</p></div>
            </div>
        </div>
    );
};

export default ChallengeReadyCard;
