import React, {useEffect} from 'react';
import Login from './Member/Login';
import MainPage from "./ToDoListPage/MainPage";
import {useLoginState} from "./Member/LoginContext";


function App() {
    let {isLogin} = useLoginState();
    return (
        <>
            {isLogin ? <MainPage/> : <Login isLogin={isLogin}/>}
        </>
        // <MainPage/>
    )

}
export default App;