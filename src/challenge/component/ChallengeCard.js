import React from 'react';
import {Card} from "reactstrap";
import {useDispatch} from "react-redux";
import {MENU_CHALLENGE} from "../../reducer/menu";
import '../style/ChallengeList.css';
import {useChallengeDispatch} from "../ChallengeContext";
import {MdEmojiPeople} from 'react-icons/md'
import Photo from "../../main/profile/ProfilePhoto";

const ChallengeReadyCard = (props) => {
    const {challengeNo,title,startDate,endDate,userCount,createUser,category}=props.challenge;
   
    let dispatch = useChallengeDispatch();

    const detailView = (challengeNo) => {
        dispatch({
            type:"DETAIL",challengeNo
        })
    }
    //console.log(createUser.nickName);

    return (
        <div className='chCard-outer'>
            <div className="" onClick={()=>{detailView(challengeNo)}}>
                <div className='chTitle'><p>{title}</p></div>
                <div className='chCategory'>카테고리 : {category.categoryName} </div>
                <div className='chDate'>{startDate.toString()}~{endDate.toString()}</div>
                <div className='chCount'><MdEmojiPeople/>{userCount}</div>
                <div className='chWriterPic'>
                    <Photo classname={"profile"} photo={createUser.photo} style={{width:"100%"}}/>
                </div>
                <div className='chWriter'>{createUser.nickName}</div>
            </div>
        </div>
    );
};

export default ChallengeReadyCard;
