import React from 'react';
import apiHoc from "../../util/apiHoc";
import {useChallengeDispatch} from "../ChallengeContext";
import {Button} from "reactstrap";
import ChallengeReadyCard from './ChallengeReadyCard';

const ChallengeList = ({result}) => {
    console.log(result);
    let dispatch = useChallengeDispatch();
    const detailView = (challengeNo) => {
        dispatch({
            type:"DETAIL",challengeNo
        })
    }

    return (
        <div className='ChallengePage'>
            <div className='Challenge' onClick={() => {detailView(3000);}}></div>
            {/* <ChallengeReadyCard/> */}
        </div>
    );
};

export default apiHoc(ChallengeList);
