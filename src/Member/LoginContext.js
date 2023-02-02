import React, { createContext, useReducer, useContext, useRef } from 'react';
const LoginStateContext = createContext(null);
const LoginDispatchContext = createContext(null);
const LoginNextIdContext = createContext(null);
function loginReducer(state=initialLogin, action) {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'data':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}
// state가 undefined이면 initialState를 기본값으로 사용
const initialLogin = [
    {
        isLogin:false,
        profile:null,
        AccessToken:null
    }
];

export function LoginProvider({ children }) {


    const [state, dispatch] = useReducer(loginReducer, initialLogin);
    const nextId = useRef(5);
    return (
        <LoginStateContext.Provider value={state}>
            <LoginDispatchContext.Provider value={dispatch}>
                <LoginNextIdContext.Provider value={nextId}>
                    {children}
                </LoginNextIdContext.Provider>
            </LoginDispatchContext.Provider>
        </LoginStateContext.Provider>
    );
}
export function useLoginState() {
    return useContext(LoginStateContext);
}

export function useLoginDispatch() {
    return useContext(LoginDispatchContext);
}

export function useLoginNextId() {
    return useContext(LoginNextIdContext);
}
