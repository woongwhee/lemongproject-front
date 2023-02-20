import React from 'react';
import {useLoginDispatch, useLoginState} from "./member/LoginContext";
import MainFront from './member/MainFront';
import MainPage from "./main/MainPage";
import {useAsync} from "react-async-hook";
import axios from "axios";
import Login from './member/Login';

function App() {
    let {isLogin} = useLoginState();

    return (
        <>
            {isLogin ? <MainPage/> : <MainFront isLogin={isLogin}/>}
        </>
    )

}
export default App;