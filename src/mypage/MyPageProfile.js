import React , {useState , useEffect} from "react";
import { Component } from "react";

// 부트스트랩
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import ProFileData from "./ProFileData";

import './MyPageUpdate.css';

import { useLoginState } from "../member/LoginContext";
import {useDispatch, useSelector} from 'react-redux';

import { BsFillPersonFill , BsFillWalletFill , BsFillTelephoneFill} from "react-icons/bs";

function MyPageProfile(props){

    let {profile}=useLoginState();
    console.log(profile);
    // const userNo = profile?.userNo; // 로그인한 사용자 userNo
    let{myprofile}=props;
    // 현재 주소에 떠있는 userNo를 가져와서 그 userNo에 해당하는 값을 사용하겠다.
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userNo = params.get("userNo"); // 로그인한 사용자 userNo

    // const userNo = params.get("userNo") != null ? params.get("userNo")  : sessionStorage.getItem("userNo");

    let saveFilePath = "http://localhost:8081/api/images/";

    const userNos = useSelector((state) => state.userNo);

    const [member , setMember] = useState();

    console.log(member)

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
            // console.log("데이터 전송 성공");
            const data = res.data.result;
            callback(data);
        }).catch(function(){
            // console.log("데이터 전송 실패");
        });
        } , []
    )
    
    // 팔로우 당하는사람(팔로워)
    const follower = profile?.userNo;

    // 팔로우 하는사람(팔로잉)
    const followerIng = profile?.userNo;

    // 팔로워
    const [myfollow , setMyFollow] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/MyFollowCount" , {
                params:{
                    followerIng : userNo ,
                }
            }).then(function(res){
                console.log(res + "데이터 전송 성공");
                const data = res.data.result;
                console.log(data);
                setMyFollow(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            });
        },[]
    )

    // 팔로잉
    const [MyFollowingCount , setMyFollowingCount] = useState();

    useEffect(
        () => {
            axios.get("/api/follow/MyFollowingCount" , {
                params : {
                    follower : userNo , 
                }
            }).then(function(res){
                console.log(res+"데이터 전송 성공");
                const data = res.data.result;
                setMyFollowingCount(data);
            }).catch(function(){
                console.log("데이터 전송 실패");
            })
        } , []
    )

    return(
        <div>
            <div className="outer_proUpdate">
                <div className="outer_myProUpdate" style={{marginTop:'280px'}}>
                    {/* <p>마이페이지 프로필 업데이트</p> */}
                    <img id="pro_Img" src={myprofile?.photo?.filePath+myprofile?.photo?.changeName} style={{marginLeft:'100px'}} className="profileImg"></img>
                    
                </div>
                    <ProFileData userNo={userNo}/>
                {/* <div className="outer_mypId">
                    <p>마이페이지 </p>
                </div> */}
                <div className="outer_myFall">
                    <p style={{fontSize:'20px' , fontFamily:'NanumGothic-Regular' , marginLeft:'80px'}}>게시글&nbsp;&nbsp;&nbsp;팔로잉&nbsp;<b>{MyFollowingCount?.count}</b>&nbsp;&nbsp;&nbsp;팔로워&nbsp;<b>{myfollow?.count}</b></p>
                    <p></p>
                </div>
                <div style={{marginLeft:'0px' , marginTop:'50px'}}>
                    <div className="outer_myName" style={{marginTop:'0px'}}>
                        <p style={{fontSize:'30px'}}><BsFillPersonFill/></p><p style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px' , marginTop:'-53px' , marginLeft:'40px'}}>{member?.userName}</p>
                    </div>
                    <div className="outer_myEmail">
                        <p style={{fontSize:'30px'}}><BsFillWalletFill/></p><p style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px' , marginTop:'-53px' , marginLeft:'40px'}}>{member?.email}</p>
                    </div>
                    <div className="outer_myPhone">
                        <p style={{fontSize:'30px'}}><BsFillTelephoneFill/></p><p style={{fontFamily:'NanumGothic-Regular' , fontSize:'25px' , marginTop:'-53px' , marginLeft:'40px'}}>010-1234-5678</p>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default MyPageProfile;