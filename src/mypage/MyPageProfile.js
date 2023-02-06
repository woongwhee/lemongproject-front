import React , {useState , useEffect} from "react";
import { Component } from "react";

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import ProFileData from "./MyPageProfileInsert";

function MyPageProfile(props){

    let{myprofile}=props;

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    let saveFilePath = "http://localhost:8081/api/images/";


    const [member , setMember] = useState();

    function callback(str){
        setMember(str);
    }

    // userNo에 보내서 값 가져오기.
    useEffect(
        () => {
        axios.get("/api/member/selectMember" ,{
            params:{
                userNo : userNo ,
            }
        }).then(function(res){
            console.log("데이터 전송 성공");
            const data = res.data.result;
            callback(data);

        }).catch(function(){
            console.log("데이터 전송 실패"); 
        });
        } , []
    )

    return(
        <div>
            <div className="outer_proUpdate">
                <div className="outer_myProUpdate">
                    <p>마이페이지 프로필 업데이트</p>
                    <img src={saveFilePath+myprofile?.photo?.changeName} style={{marginLeft:'100px'}} className="profileImg"></img>
                    
                </div>
                    <ProFileData userNo={userNo}/>
                <div className="outer_mypId">
                    <p>마이페이지 </p>
                </div>
                <div className="outer_myFall">
                    <p>게시글 / 팔로윙 / 팔로워</p>
                    <p></p>
                </div>
                <div className="outer_myName">
                    <p>이름: {member?.userName}</p>
                </div>
                <div className="outer_myEmail">
                    <p>이메일: {member?.email}</p>
                </div>
                <div className="outer_myPhone">
                    <p>핸드폰 번호: </p>
                </div>
            </div>
        </div>
        
    );
};

export default MyPageProfile;