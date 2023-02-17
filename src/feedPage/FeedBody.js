import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";
import axios from "axios";
import Feed from "./Feed1";
import FeedLoading from "./FeedLoading";
import {useLoginState} from "../Member/LoginContext";
import {codeHandler} from "../util/apiUtil";

function FeedBody(){
    // 요청받은 정보를 담아줄 변수 선언
    const [ feedList, setFeedList] = useState([]);
    const isLanding = useRef(false);
    const [page, setPage] = useState(0);
    const maxPage = useRef(-1);
    const target = useRef(null);

    const options = {
        threshold: 1.0,
    };

    const loadPage = async () => {
        if (isLanding.current == true) return;
        isLanding.current = true;
        if (maxPage.current == -1) {
            maxPage.current =await axios.get(`/api/feed/feedCount`).then(res=>codeHandler(res));
        }
        let result = await axios.get(`/api/feed/main/${page}`).then(res=>codeHandler(res));
        let newList = [...feedList, ...result];
        setFeedList(newList);
        console.log(newList);
        isLanding.current = false;
    };


    const handleObserver = useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            if (maxPage.current <= page && maxPage.current != -1) {
                return;
            }
            setPage((prev) => prev + 1);
        }
    }, []);

    useEffect(() => {
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (target.current) observer.observe(target.current);
    }, [handleObserver]);
    useEffect(() => {
        loadPage();
    }, [page])
    //         ''        data
    //         data
    // const testStr = String data(hello world)
    //                 JSON, 객체 상관이없다!
    // 변수 초기화
    function callback(str) {
        setFeedList(str);
    }
    const [loading, setLoading] = useState(true);
    const {userNo}=useLoginState().profile;
    // let {userNo} =useLoginState().profile;
    // console.log({userNo})
    //
    // 첫 번째 렌더링을 마친 후 실행
    // useEffect(
    //     async () => {
    //        let res=await axios.get(`/api/feed/main/${page}`)
    //         let feedList=codeHandler(res);
    //        setFeedList(feedList);
    //         setLoading(false);
    //     }, []
    // );





    let i=0;
    return(
        <div>
            <div style={{overflow:"scroll", height:"800px"}}>
                {feedList?.map((e)=><Feed key={i++} {...e} loginUserNo={userNo}/>)}
                <div ref={target} style={{border:"1px solid red", height:"30px"}}></div>
            </div>
        </div>
    );
}
export default FeedBody;