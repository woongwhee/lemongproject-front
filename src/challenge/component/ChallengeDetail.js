import React from 'react';
import apiHoc from "../../util/apiHoc";
import {Button} from "reactstrap";
import {cancelMulti, joinMulti} from "../challengeApi";
import {useLoginState} from "../../Member/LoginContext";

const ChallengeDetail = ({result}) => {
    const {challengeNo, challengeTitle, challengeInfo, startDate, LocalDate, endDate,readyUsers,todoPreview} = result;
    const {userNo}=useLoginState().profile;
    const isReady=readyUsers.find(e=>e.userNo==userNo)==undefined?true:false
    const join = async () => {
        let res = await joinMulti(challengeNo);
        alert(res);
    }
    const cancel = async () => {
        let res = await cancelMulti(challengeNo);
        alert(res);
    }
    return (
        <div>
            {isReady?<Button onClick={join}>흐에</Button>:<Button onClick={cancel}>포기할래요</Button>}
        </div>
    );
};

export default apiHoc(ChallengeDetail);
