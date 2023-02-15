import React, {useEffect} from 'react';
import {useChallengeDispatch, useChallengeState} from "./ChallengeContext";

const ChallengeSwitcher = () => {
    const state = useChallengeState();
    const switching = (state) => {
        switch (state.index) {
            case 0:
            case 1:
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
