import React, {useEffect} from 'react';
import {useChallengeDispatch, useChallengeState} from "./ChallengeContext";
import ChallengeListView from "./page/ChallengeListView";
import ChallengeDetailView from "./page/ChallengeDetailView";

const ChallengeSwitcher = () => {
    const state = useChallengeState();
    const switching = (state) => {
        switch (state.index) {
            case 0: return <ChallengeListView/>
            case 1: return <ChallengeDetailView/>
        }
    }
    return (
        <>
            {
                switching(state)
            }
        </>)

};

export default ChallengeSwitcher;
