import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import Feed from "./Feed";
import FeedLoading from "./FeedLoading";


function FeedBody(){
    // 요청받은 정보를 담아줄 변수 선언
    const [ testStr, setTestStr] = useState();
    //         ''        data
    //         data
    // const testStr = String data(hello world)
    //                 JSON, 객체 상관이없다!
    // 변수 초기화
    function callback(str) {
        setTestStr(str);

    }
    const [loading, setLoading] = useState(true);

    // 첫 번째 렌더링을 마친 후 실행
    useEffect(
        () => {
            axios({
                url: '/api/feed/main',
                method: 'GET'
            }).then((res) => {
                callback(res.data.result);
                setLoading(false);
            })
        }, []
    );
    let i=0;
    return(
        <div>
            <div style={{overflow:"scroll", height:"800px"}}>
            {/*{loading ? <FeedLoading/> : testStr?.map(e=><Feed key={i++} {...e} />)}*/}
            </div>
        </div>
    );
}
export default FeedBody;