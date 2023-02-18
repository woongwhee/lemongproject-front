import React, {useEffect, useState} from 'react';
import Login from './member/Login';
import MainPage from "./ToDoListPage/MainPage";
import {useLoginState} from "./member/LoginContext";
import FeedLoading from "./feedPage/FeedLoading";
import TitleInfo from "./member/TitleInfo";
import MainFront from './member/MainFront';


function App() {
    let {isLogin} = useLoginState();
    // const [loading, setLoading] = useState(true);
    return (
        <>
            {isLogin ? <MainPage/> : <MainFront isLogin={isLogin}/>}

        </>

    )

}
export default App;