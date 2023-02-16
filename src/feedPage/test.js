import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";
import axios from "axios";
import Feed from "./Feed1";
import FeedLoading from "./FeedLoading";

function FeedBody(){
    // 요청받은 정보를 담아줄 변수 선언
    const [ testStr, setTestStr] = useState([]);
    //         ''        data
    //         data
    // const testStr = String data(hello world)
    //                 JSON, 객체 상관이없다!
    // 변수 초기화
    function callback(str) {
        setTestStr(str);

    }
    const [loading, setLoading] = useState(true);
    const [loginUserNo, setLoginUserNo] = useState(0);


    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [load, setLoad] = useState(1);
    const preventRef = useRef(true);
    const obsRef = useRef(null);

    const endRef = useRef(false); //모든 글 로드 확인

    console.log(list)

    const getDog = useCallback(async() => { //글 불러오기
        setLoad(true); //로딩 시작

        await axios({
            method : 'GET',
            url : `/api/feed/main`
        }).then((res) => {
            callback(res.data.result)
            console.log(res.data.result)
            setLoading(false);
                //
                // if(res.data.result.end){
              //     endRef.current = true;
                // }
        });
        for(let i = 0; i<testStr.length; i++){
            setList(prev=> [...prev, {...testStr[i]}]); //리스트 추가
        }
        preventRef.current = true;
        setLoad(false); //로딩 종료
    }, [page]);



    useEffect(()=> {
        getDog();
        const observer = new IntersectionObserver(obsHandler, { threshold : 0.5 });
        if(obsRef.current) observer.observe(obsRef.current);
        return () => { observer.disconnect(); }
    }, [])

    useEffect(()=> {
        getDog();
    }, [page])


    const obsHandler = ((entries) => {
        const target = entries[0];
        if(target.isIntersecting && preventRef.current){
            preventRef.current = false;
            setPage(prev => prev+1 );
        }
    })

    useEffect(
        () => {
            axios({
                url: '/api/feed/loginFeedUserNo',
                method: 'POST'
            }).then((res) => {
                // console.log(res.data)
                setLoginUserNo(res.data)
            })
        }, []
    );

    let i=0;
    return(
        <div>
            <div style={{overflow:"scroll", height:"500px", border:"1px solid red"}}>
                <div className="wrap min-h-[100vh]">
                    {
                        list && list.map((e)=><Feed key={i++} {...e}/>)
                    }
                    {load && <div className="py-3 bg-blue-500 text-center">로딩 중</div>}
                    <div ref={obsRef} className="py-3 bg-red-500 text-white text-center">옵저버 Element</div>
                </div>
            </div>
        </div>
    );
}
export default FeedBody;