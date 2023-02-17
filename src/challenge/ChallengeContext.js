import React, {createContext, useReducer, useContext, useRef, useEffect} from 'react';
import challenge from "../challengeChat/challenge";
import {useSelector} from "react-redux";
import {isEmpty} from "../util/typeUtile";

const ChallengeStateContext = createContext(null);
const ChallengeDispatchContext = createContext(null);
const ChallengeNextIdContext = createContext(null);


function challengeReducer(state, action) {
    switch (action.type) {
        case 'DETAIL':
            return {index: 1, challengeNo: action.challengeNo};
        case 'LIST':
            return initialParam;
        default:
            return state;
    }
}

// state가 undefined이면 initialState를 기본값으로 사용
const initialParam = {
    index: 0
};

export const ChallengeProvider = ({children}) => {
    const menuParam = useSelector(state => state.menuParam);
    const [state, dispatch] = useReducer(challengeReducer, initialParam);
    if (!isEmpty(menuParam)) {
        dispatch({type: 'DETAIL', challengeNo: menuParam})
    }

    const nextId = useRef(7);
    useEffect(() => {
    })
    return (
        <ChallengeStateContext.Provider value={state}>
            <ChallengeDispatchContext.Provider value={dispatch}>
                <ChallengeNextIdContext.Provider value={nextId}>
                    {children}
                </ChallengeNextIdContext.Provider>
            </ChallengeDispatchContext.Provider>
        </ChallengeStateContext.Provider>
    );
}

export const useChallengeState = () => {
    return useContext(ChallengeStateContext);
}

export const useChallengeDispatch = () => {
    return useContext(ChallengeDispatchContext);
}

export const useChallengeNextId = () => {
    return useContext(ChallengeNextIdContext);
}
