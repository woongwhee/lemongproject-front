import React , {useState , useEffect} from "react";
import { Component } from "react";

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import ProFileData from "./MyPageProfileInsert";

function MyPageProfile(){

    // member테이블에서 userNo에 해당하는 유저 정보 가져오기.
    const [user , setUser] = useState();

    const selectUser = async() => {
        const response = await axios.get("/api/member/selectUser");
        setUser(response.data[0]);
    }
    useEffect(() => {selectUser()},[])

    // photo테이블에서 userNo에 해당하는 프로필 사진 정보 가져오기.
    const [myprofile , setMyProfile] = useState();

    const selectMyProfile = async() => {
        const response = await axios.get("/api/member/selectMyProfileImg");
        setMyProfile(response.data[0])
        console.log(response.data)
    }
    useEffect(() => {selectMyProfile()},[])

    let saveFilePath = "http://localhost:8081/api/images/";
   
    return(
        <div className="outer_proUpdate">
                <div className="outer_myProUpdate">
                    <p>마이페이지 프로필 업데이트</p>
                    <img src={saveFilePath+myprofile?.changeName} className="profileImg"></img>
                    
                </div>
                    <ProFileData/>
                <div className="outer_mypId">
                    <p>마이페이지 Id</p>
                </div>
                <div className="outer_myFall">
                    <p>게시글 / 팔로윙 / 팔로워</p>
                </div>
                <div className="outer_myName">
                    <p>이름:</p>
                </div>
                <div className="outer_myEmail">
                    <p>이메일: {user?.email}</p>
                </div>
                <div className="outer_myPhone">
                    <p>핸드폰 번호:</p>
                </div>
            </div>
    );
};

export default MyPageProfile;