import React from 'react';
import apiHoc from "../../util/apiHoc";
import {useChallengeDispatch} from "../ChallengeContext";
import {Button} from "reactstrap";
import ChallengeCard from './ChallengeCard';
import '../style/ChallengeList.css';

const ChallengeList = ({result}) => {
    //console.log(result);
    let dispatch = useChallengeDispatch();

    const detailView = (challengeNo) => {
        dispatch({
            type:"DETAIL",challengeNo
        })
    }

    return (
        <div className='ChallengePage'>
            {result.map((challenge, index) =><ChallengeCard challenge={challenge} key={index}/> )}
            {/* <div className='Challenge' onClick={() => {detailView(3000);}}></div> */}
        </div>
    );
};

export default apiHoc(ChallengeList);
