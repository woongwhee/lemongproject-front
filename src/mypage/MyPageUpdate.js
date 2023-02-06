import React , {useState , useEffect} from "react";
import { Component } from "react";

import './MyPage.css';
import './MyPageUpdate.css';

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import MyPageProfile from "./MyPageProfile";
import MyPagePwdCheck from "./MypagePwdUpdate";
import MyDelete from "./MyDelete";
import ChallengeChatRoom from "../challengeChat/challengeChatRoom";

import { BsFillBrushFill , BsCheckLg } from "react-icons/bs";

function MyPageUpdate(){

    const userNo = sessionStorage.getItem("userNo");

    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    // const userNo1 = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");
    const userNo1 = sessionStorage.getItem("userNo");

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

     // 마이페이지 닉네임 체크 
     const [mynickCheck , setMyNickCheck] = useState({
        checkValue : '' ,
     });

     // 검색해온 닉네임 여따가 저장
     const [saveCheckNick , setSaveCheckNick] = useState();

     // 검색한 닉네임 저장
     const CheckValHandle = (event) => {

        const {name , value} = event.target;

        setMyNickCheck({
            ...mynickCheck , 
            [name]:value,
        });
     };

     function MyPageNickCheck(){
        if(mynickCheck.checkValue !== ""){
            axios.get("/api/member/MyPageNickCheck" , {
                params:{
                    checkNick : mynickCheck.checkValue , 
                }
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                console.log(data);
                setSaveCheckNick(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        }
     }

     function showCheckNick(){
        if(saveCheckNick?.nickName == "" || mynickCheck?.checkValue ==""){
            return <div></div>
        }else if(saveCheckNick?.nickName === mynickCheck?.checkValue){
            return <div style={{color:'red' , fontSize:'20px'}}>중복되는 닉네임 입니다.</div>
        }else{
            return <div style={{color:'green' , fontSize:'20px'}}>사용 가능한 닉네임 입니다.</div>
        }
     }
     
     // 중복 체크 후 닉네임 변경
     function updateMyNickName(){
        axios.get("/api/member/updateMyNick" , {
            params:{
                updateNick : mynickCheck.checkValue ,
                userNo : userNo ,
            }
        }).then(function(res){
            console.log(res + "데이터 전송 성공");
            alert("닉네임 변경이 완료되었습니다.");
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
     }

     // 화면 보여주기
     const [show , setShow] = useState(false);

     // 볼펜 버튼 클릭 시 div 보여주기
     const  showIntro = () =>{
        setShow(true);
     }

     // 변경할 자기소개 내용 저장하기
     const [updateContent , setUpdateContent] = useState({
        updateCont : '',
     })

     const UpdateContentHandle = (event) => {
        const {name , value} = event.target;

        setUpdateContent({
            ...updateContent,
            [name]:value,
        });
     };

     function updateMyContent(){
        axios.get("/api/member/updateMyContent" , {
            params:{
                updateCont : updateContent.updateCont ,
                userNo : userNo ,
            }
        }).then(function(res){
            console.log(res + "데이터 전송 성공");
            alert("Introdeuction이 변경되었습니다.");
            window.location.href = "http://localhost:3000/MyPageUpdate?userNo="+userNo;
        }).catch(function(){
            console.log("데이터 전송 실패");
        })
     }

    return(
        <div>
            <ChallengeChatRoom/>
            <form className="outer" style={{position:'absolute'}}>

                <MyPageProfile myprofile={myprofile}/>    
                <div className="outer_myContent">
                    <h1 style={{marginTop: "130px" , marginLeft: "70px" , fontSize: "50px"}}><b>My ProFile</b></h1>

                    <MyDelete/>

                    <hr style={{marginTop: "0px" , inlineSize: "85%" , marginLeft: "70px"}}></hr>

                    <br/><br/><br/>

                    <h6 style={{marginLeft: "70px"}}><b>NickName
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;
                        NickNameCheck</b></h6>
                    <div className="outer_myNickUpdate">
                       <p>{myprofile?.nickName}</p>
                    </div>
                    <div className="outer_myNickUpdateCheck">
                        <input type="text" name="checkValue" placeholder="변경할 닉네임을 입력해주세요" className="form-control" 
                        onChange={CheckValHandle} style={{height:'38px' , borderRadius:'0'}}></input>
                        {showCheckNick()}
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" className="nickCheckBtn" class="btn btn-primary" style={{borderRadius:'0' , width:'70px'}} onClick={MyPageNickCheck}>체크</button>&nbsp;
                    <button type="submit" className="nickCheckBtn" class="btn btn-primary" style={{borderRadius:'0' , width:'70px'}} onClick={updateMyNickName}>변경</button>

                    <br/><br/><br/>
                        <MyPagePwdCheck/>
                    <br/><br/>

                    <h6 style={{marginLeft: "70px"}}><b>Introdeuction</b></h6>
                    <BsFillBrushFill style={{marginTop:"-58px" , marginLeft:'180px'}} onClick={showIntro}></BsFillBrushFill>
                    {show ? <form>
                        <textarea name ="updateCont" onChange={UpdateContentHandle} className="outer_Introdeuction" style={{height:'168.5px'}}>
                        </textarea> <BsCheckLg onClick={updateMyContent} style={{marginTop:'-455px' , marginLeft:'210px'}} ></BsCheckLg>
                    </form> : <div className="outer_Introdeuction">
                        <p>{myprofile?.profileComment}</p>
                    </div>}
                    
                </div>
            </form>
        </div>
    );
};

export default MyPageUpdate;