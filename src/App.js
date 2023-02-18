import React from 'react';
import {useLoginDispatch, useLoginState} from "./member/LoginContext";
import MainFront from './member/MainFront';
import MainPage from "./main/MainPage";
import {useAsync} from "react-async-hook";
import axios from "axios";

function App() {
    let {isLogin} = useLoginState();

    return (
        <>
            {isLogin ? <MainPage/> : <MainFront/>}
        </>
    )

}
export default App;