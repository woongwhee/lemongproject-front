import React, {useCallback, useEffect, useReducer, useRef, useState} from "react";
import axios from "axios";
import Feed from "./Feed1";
import FeedLoading from "./FeedLoading";
import {useLoginState} from "../member/LoginContext";
import {codeHandler} from "../util/apiUtil";
import "./FeedBody.css"
import FeedAlarm from "./FeedAlarm";
import FeedInsert from "./FeedInsert";

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
    function callback(str) {
        setFeedList(str);
    }
    const [loading, setLoading] = useState(true);
    // let {userNo} =useLoginState().profile;
    // console.log({userNo})

    // style={{overflow:"scroll", height:"800px", scrollbarWidth:"none"}}
    let i=0;
    return(
        <div>
            <div className="FeedBody" >
                <div style={{border:"5px, solid red",marginTop:"20px", position:"fixed"}}>
                    <div style={{float:"left"}}><FeedAlarm/></div>
                    <div style={{float:"left"}}><FeedInsert/></div>
                </div>
                {feedList?.map((e)=><Feed key={i++} {...e}/>)}
                <div ref={target} style={{height:"30px"}}></div>
            </div>
        </div>
    );
}
export default FeedBody;