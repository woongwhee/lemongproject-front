import React, {createContext, useReducer, useContext, useRef} from 'react';
import challenge from "../challengeChat/challenge";

const ChallengeStateContext = createContext(null);
const ChallengeDispatchContext = createContext(null);
const ChallengeNextIdContext = createContext(null);


function challengeReducer(state, action) {
    switch (action.type) {
        case 'DETAIL':
            return {index: 1, challengeNo: action.challengeNo, list: state.list};
        case 'ADD_LIST' :
            state.list = state.list.concat(action.list)
            return state;
        case 'LIST' :
            return initialParam;
        case 'CATEGORY' :
            return {...state, categoryNo: action.categoryNo}
        case 'ADD_CATEGORY' :
            return {...state, categories: action.categories}
        case 'WRITE':
            return {...state, index: 2};
        default:
            return state;
    }
}

// state가 undefined이면 initialState를 기본값으로 사용
const initialParam = {
    index: 0,
    challengeNo: null,
    categoryNo: 0,
    page: 0,
    list: []
};

export const ChallengeProvider = ({children}) => {
    const [state, dispatch] = useReducer(challengeReducer, initialParam);
    const nextId = useRef(6);

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
