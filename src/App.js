import React, {useEffect, useState} from 'react';
import Login from './Member/Login';
import MainPage from "./ToDoListPage/MainPage";
import {useLoginState} from "./Member/LoginContext";
import FeedLoading from "./feedPage/FeedLoading";
import TitleInfo from "./Member/TitleInfo";
import MainFront from './Member/MainFront';


function App() {
    let {isLogin} = useLoginState();
    // const [loading, setLoading] = useState(true);
    return (
        <>
            {/* {isLogin ? <MainPage/> : <Login isLogin={isLogin}/>} */}
            {/*{isLogin ? setLoading(false) : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? setLoading(false) : isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? <FeedLoading/>*/}
            {/* <TitleInfo /> */}
            {/*  메인페이지 화면 테스팅용임!  */}
            {isLogin ? <MainPage/> : <MainFront isLogin={isLogin}/>}
            {/* <MainFront /> */}

        </>
        // <MainPage/>
    )

}
export default App;