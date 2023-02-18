import React from 'react';
import {useAsync} from "react-async-hook";
import ChallengeList from "../component/ChallengeList";
import {readyList} from "../challengeApi";
import '../style/ChallengeList.css';

const ChallengeListView = () => {
    const state=useAsync(readyList,[0]);
    return (
        <ChallengeList state={state}/>
    );
};

export default ChallengeListView;
