import React , {useState , useEffect} from "react";
import { Component } from "react";

import './MyPage.css';
import './MyPageUpdate.css';

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import MyPageProfile from "./MyPageProfile";
import MyPagePwdCheck from "./MypagePwdUpdate";
import MyDelete from "./MyDelete";

function MyPageUpdate(){

    const userNo = sessionStorage.getItem("userNo");

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const userNo1 = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

     // photo테이블에서 userNo에 해당하는 프로필 사진 정보 가져오기.
     const [myprofile , setMyProfile] = useState();
 
     function callback(data){
         setMyProfile(data);
     }
 
     useEffect(
         () => {
             axios.get("/api/member/selectMyProfile" , {
                 params:{
                     userNo : userNo1 ,
                 }
             }).then(function(res){
                 console.log("데이터 전송 성공");
                 const data = res.data.result;
                 console.log(data);
                 callback(data);
                 
             }).catch(function(){
                 console.log("데이터 전송 실패");
             });
         } , []
     );
        
    // },[])

    // // 리액트에서 스프링으로 유저 정보 보내기(Update) => NickName
    // const updateNickName  = async() => {
    //     const modifyNickname = prompt("[" + member.nickName + "]" + " 을(를) 어떤 닉네임으로 변경할까요?");

    //     console.log(modifyNickname);

    //     if(modifyNickname !== null){
    //         const body = {
    //             nickname : 'modifyNickname'
    //         }

    //         const userNiname = axios.get("/api/member/checkNickName" , {
    //             params:{
    //                 modifyNickname : modifyNickname ,
    //             }
    //         }).then(function(){
    //             if(userNiname.data){
    //                 alert("NickName이 변경되었습니다.");
    //                 return window.location.reload();
    //             }
    //         });
    //     }
    // }

    //  // 리액트에서 스프링으로 유저 정보 보내기(Update) => NickName
    //  const updateComment = async() => {

    //     const modifyComment = prompt("Introdeuction을 입력해주세요.");

    //     if(modifyComment !== null){
    //         const body = {
    //             comment : 'modifyComment'
    //         }

    //         const userComment = axios.get("/api/member/updateComment" , {
    //             params:{
    //                 modifyComment : modifyComment ,
    //             }
    //         }).catch(function(){
    //             if(userComment.data){
    //                 alert("Introdeuction이 변경되었습니다.");
    //                 return window.location.reload();
    //             }
    //         })
    //     }

    // }
    // if(isLoding) {return <h1>로딩중</h1>}

    return(
        <div >
            <form className="outer" >

                <MyPageProfile myprofile={myprofile}/>    
                <div className="outer_myContent">
                    <h1 style={{marginTop: "130px" , marginLeft: "70px" , fontSize: "50px"}}>My ProFile</h1>

                    <MyDelete/>

                    <hr style={{marginTop: "0px" , inlineSize: "85%" , marginLeft: "70px"}}></hr>

                    <br/><br/><br/>

                    <h7 style={{marginLeft: "70px"}}>NickName</h7>
                    <div className="outer_myNickUpdate">
                       <p>{myprofile?.nickName}</p>
                    </div>

                    <br/>
                        <MyPagePwdCheck/>
                    <br/><br/><br/><br/>

                    <h7 style={{marginLeft: "70px"}}>Introdeuction</h7>
                    <div className="outer_Introdeuction">
                        <p>{myprofile?.profileComment}</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MyPageUpdate;