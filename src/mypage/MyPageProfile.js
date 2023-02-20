import React, {useState, useEffect} from "react";
import {Component} from "react";

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import {Button} from "react-bootstrap";
import axios from "axios";
import ProFileData from "./ProFileData";

import './MyPageUpdate.css';

import {useLoginState} from "../member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

import {BsFillPersonFill, BsFillWalletFill, BsFillTelephoneFill} from "react-icons/bs";
import {codeHandler} from "../util/apiUtil";

function MyPageProfile(props) {

    // const userNo = profile?.userNo; // 로그인한 사용자 userNo

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    let saveFilePath = "http://localhost:8081/api/images/";
    const [member, setMember] = useState();
    let [myProfile,setMyProfile] = useState({});
    function callback(str) {
        setMember(str);
    }

    // userNo에 보내서 값 가져오기.
    useEffect(
        async () => {
            await axios.get("/api/p/checkLogin").then((res) => {
                let result = codeHandler(res);
                setMyProfile(result);
            }).catch(()=>{
                alert("loginError!");
                window.location.href = "/";
            })
            await axios.get("/api/member/selectMember", {
                    params: {
                        userNo: myProfile?.userNo
                    }
                }).then(function (res) {
                // console.log("데이터 전송 성공");
                const data = res.data.result;
                callback(data);
            }).catch(function () {

            });
        }, [])


// 팔로워
const [myfollow, setMyFollow] = useState();

useEffect(
    () => {
        axios.get("/api/follow/MyFollowCount", {
            params: {
                followerIng: myProfile.userNo,
            }
        }).then(function (res) {
            console.log(res + "데이터 전송 성공");
            const data = res.data.result;
            console.log(data);
            setMyFollow(data);
        }).catch(function () {
            console.log("데이터 전송 실패");
        });
    }, [myProfile]
)

// 팔로잉
const [MyFollowingCount, setMyFollowingCount] = useState();

useEffect(
    () => {
        axios.get("/api/follow/MyFollowingCount", {
            params: {
                follower: myProfile.userNo,
            }
        }).then(function (res) {
            console.log(res + "데이터 전송 성공");
            const data = res.data.result;
            setMyFollowingCount(data);
        }).catch(function () {
            console.log("데이터 전송 실패");
        })
    }, [myProfile]
)

return (
    <div>
        <div className="outer_proUpdate">
            <div className="outer_myProUpdate" style={{marginTop: '280px'}}>
                {/* <p>마이페이지 프로필 업데이트</p> */}
                <img id="pro_Img" src={myProfile?.photo?.filePath + myProfile?.photo?.changeName}
                     style={{marginLeft: '100px'}} className="profileImg"/>
            </div>
            <ProFileData userNo={myProfile}/>
            {/* <div className="outer_mypId">
                    <p>마이페이지 </p>
                </div> */}
            <div className="outer_myFall">
                <p style={{
                    fontSize: '20px',
                    fontFamily: 'NanumGothic-Regular',
                    marginLeft: '80px'
                }}>게시글&nbsp;&nbsp;&nbsp;팔로잉&nbsp;<b>{MyFollowingCount?.count}</b>&nbsp;&nbsp;&nbsp;팔로워&nbsp;
                    <b>{myfollow?.count}</b></p>
                <p></p>
            </div>
            <div style={{marginLeft: '0px', marginTop: '50px'}}>
                <div className="outer_myName" style={{marginTop: '0px'}}>
                    <p style={{fontSize: '30px'}}><BsFillPersonFill/></p><p style={{
                    fontFamily: 'NanumGothic-Regular',
                    fontSize: '25px',
                    marginTop: '-53px',
                    marginLeft: '40px'
                }}>{member?.userName}</p>
                </div>
                <div className="outer_myEmail">
                    <p style={{fontSize: '30px'}}><BsFillWalletFill/></p><p style={{
                    fontFamily: 'NanumGothic-Regular',
                    fontSize: '25px',
                    marginTop: '-53px',
                    marginLeft: '40px'
                }}>{member?.email}</p>
                </div>
            </div>
        </div>
    </div>

);
}
;

export default MyPageProfile;