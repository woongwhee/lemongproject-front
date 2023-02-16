import React, {useEffect, useState} from 'react';
import Login from './Member/Login';
import MainPage from "./ToDoListPage/MainPage";
import {useLoginState} from "./Member/LoginContext";
import FeedLoading from "./feedPage/FeedLoading";


function App() {
    let {isLogin} = useLoginState();
    // const [loading, setLoading] = useState(true);
    return (
        <>
            {isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}
            {/*{isLogin ? setLoading(false) : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? setLoading(false) : isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}*/}
            {/*{loading ? <FeedLoading/>*/}
        </>
        // <MainPage/>
    )

}
export default App;