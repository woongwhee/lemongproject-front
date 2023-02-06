import React, {createContext, useReducer, useContext, useRef, useEffect} from 'react';
import axios from "axios";

const LoginStateContext = createContext(null);
const LoginDispatchContext = createContext(null);
const LoginNextIdContext = createContext(null);

function loginReducer(state, action) {
    switch (action.type) {
        case 'login':
            return action.payload;
        case 'unLogin':
            return initialLogin;
        case 'data':
            return state.filter(todo => todo.id !== action.id);
        default:
            return state;
    }
}

// state가 undefined이면 initialState를 기본값으로 사용
const initialLogin = [
    {
        isLogin: false,
        profile: null,
        AccessToken: null
    }
];

export function LoginProvider({children}) {
const [state, dispatch] = useReducer(loginReducer, initialLogin);
const nextId = useRef(5);
useEffect(() => {
        axios.interceptors.response.use((res) => {
                const code = res.data.code
                if (code === '4000') {
                    dispatch(({type: "unLogin"}))
                }
                return res
            }, () => {
        }
        )
    return
}, [state])
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
