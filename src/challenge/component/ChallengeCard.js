import React from 'react';
import {Card} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_CHALLENGE} from "../../reducer/menu";
import '../style/ChallengeList.css';
import {useChallengeDispatch} from "../ChallengeContext";
import {MdEmojiPeople} from 'react-icons/md'

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
        <div className='chCard-outer'>
            <div className="challengeCard" onClick={()=>{detailView(challengeNo)}}>
                <div className='chTitle'><p>{title}</p></div>
                <div className='chCategory'>카테고리</div>
                <div className='chDate'>{startDate.toString()}~{endDate.toString()}</div>
                <div className='chCount'><MdEmojiPeople/>{userCount}</div>
                <div className='chWriterPic'><img className="profile" src={createUser.filePath} alt={createUser.nickName}/></div>
                <div className='chWriter'>{createUser.nickName}</div>
            </div>
        </div>
    );
};

export default ChallengeReadyCard;
