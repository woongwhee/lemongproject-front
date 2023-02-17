import React, {useEffect, useState} from 'react';
import Login from './member/Login';
import {useLoginState} from "./member/LoginContext";
import TitleInfo from "./member/TitleInfo";
import MainFront from './member/MainFront';

import MainPage from "./main/MainPage";
import {useLoginState} from "./member/LoginContext";
import Login from "./member/Login";


function App() {
    let {isLogin} = useLoginState();
    return (
        <>
            {isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}
            {/*{isLogin ? <MainPage/> : <MainFront isLogin={isLogin}/>}*/}
        </>
    )

}
export default App;