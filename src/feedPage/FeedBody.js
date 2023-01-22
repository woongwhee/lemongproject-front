import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import Feed from "./Feed";
import {Spinner, Toast, ToastHeader} from "react-bootstrap";

function FeedBody(){
    // 요청받은 정보를 담아줄 변수 선언
    const [ testStr, setTestStr ] = useState();

    //         ''        data
    //         data
    // const testStr = String data(hello world)
    //                 JSON, 객체 상관이없다!

    // 변수 초기화
    function callback(str) {
        setTestStr(str);
        // setLoading(false);
    }

    // 첫 번째 렌더링을 마친 후 실행
    useEffect(
        () => {
            axios({
                url: '/api/feed/main',
                method: 'GET'
            }).then((res) => {
                // console.log(res.data.result)
                callback(res.data.result);
            })
        }, []
    );
    let i=0;
    return(
        <div className="App">
            <header className="App-header">
                {testStr?.map(e=><Feed key={i++} {...e}/>)}
            </header>
        </div>
    );
}
export default FeedBody;