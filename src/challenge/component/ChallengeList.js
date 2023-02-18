import React from 'react';
import apiHoc from "../../util/apiHoc";
import {useChallengeDispatch} from "../ChallengeContext";
import {Button} from "reactstrap";

const ChallengeList = ({result}) => {
    console.log(result);
    let dispatch = useChallengeDispatch();
    const detailView = (challengeNo) => {
        dispatch({
            type:"DETAIL",challengeNo
        })
    }

    return (
        <div className='challenge'>
            <Button onClick={() => {detailView(3000);}}>3000만큼사랑해</Button>
        </div>
    );
};

export default apiHoc(ChallengeList);
