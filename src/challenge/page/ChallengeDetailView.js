import React from 'react';
import {useChallengeState} from "../ChallengeContext";
import {useAsync} from "react-async-hook";
import {readyDetail} from "../challengeApi";
import ChallengeDetail from "../component/ChallengeDetail";

const ChallengeDetailView = () => {
    const{challengeNo}=useChallengeState();
    const state=useAsync(readyDetail,[challengeNo])
    return (
        <ChallengeDetail state={state}/>
    );
};

export default ChallengeDetailView;
