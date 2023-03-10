import React, {useState, useEffect} from "react";
import {Component} from "react";
import axios from "axios";

import MyFollowDelete from "./MyFollowDelete";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import {ImUserPlus} from "react-icons/im";
import {useDispatch, useSelector} from 'react-redux';
import {useLoginState} from "../member/LoginContext";

function MyFollowApplication() {
    const [myfollowingList, setMyFollowingList] = useState([]);
    const userNo = useSelector((state) => state.menu.userNo);
    const myNo = useLoginState().profile.userNo;

    console.log(userNo + " 값 확인중 ")
    // console.log(userNos + " 값 확인중 ")

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    // 팔로우 당하는사람(팔로워)
    // 버튼 클릭시 보낸사람(sessiong.user_No) -> 받는사람(params.userNo)에게 팔로워 신청 보내기.
    function followGo() {
        axios.get(`/api/follow/followGo/${myNo}/${userNo}`).then(function (res) {
            console.log(res + "데이터 전송 성공");
            alert("팔로우 신청이 완료되었습니다.");
            ShowMyFollowing();
        }).catch(function () {
            console.log("데이터 전송 실패");
        })
    }

    function ShowMyFollowing() {
        axios.get(`/api/follow/selectMyFollowingList/${userNo}`).then(function (res) {
            console.log(res + "데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            setMyFollowingList(data);
        }).catch(function () {
            console.log("데이터 전송 실패");
        })
    }

    useEffect(() => {
        ShowMyFollowing();
        console.log(userNo + "===여기도 통과됨")
    }, [userNo])




    return (
        <div>
            {(myNo==userNo)?<></>:(myfollowingList?.find(e => e?.profile?.userNo == userNo) == null)?<MyFollowDelete showMyFollowing={ShowMyFollowing}></MyFollowDelete>:(<div>
                <button className="btn btn-primary"
                        style={{marginLeft: '215px', fontSize: '13px', borderRadius: '100px', width: '100px'}}
                        onClick={followGo}>팔로우 신청
                </button>
            </div>)}
        </div>
    )
}

export default MyFollowApplication;